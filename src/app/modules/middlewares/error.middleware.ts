/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodError } from 'zod';
import { CustomError } from './CustomError';
import { Request, Response, NextFunction } from 'express';

// 1. Not Found Handler: এই ফাংশনটি তখন ব্যবহার হয় যখন রিকোয়েস্ট করা রুট পাওয়া যায় না।
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Cannot GET ${req.originalUrl}`, // রিকোয়েস্ট করা রুটের পথ সহ ৪০৪ মেসেজ।
  });
};

// 2. Error Handler: সব ধরণের error হ্যান্ডল করার জন্য একটি কেন্দ্রীয় middleware।
export const errorHandler = (
  err: any, // `err` ত্রুটিটি যা এই middleware-এ ধরা হয়।
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error Middleware:', err); // কনসোলে ত্রুটির তথ্য দেখানো হয়।

  // A. Zod Validation Errors হ্যান্ডল করা
  if (err instanceof ZodError) {
    const errors = err.errors.reduce((acc: any, curr: any) => {
      const path = curr.path.join('.'); // ত্রুটির path গঠন করা (e.g., "user.name")।
      acc[path] = {
        message: curr.message, // ত্রুটির বিবরণ।
        name: 'ValidatorError',
        properties: {
          type: curr.code, // Zod কোড দেখানো হয়।
        },
      };
      return acc;
    }, {});

    // CustomError দিয়ে একটি নতুন ত্রুটি তৈরি করা হয়।
    const customError = new CustomError('Validation failed', 400, errors);
    console.log('customError.stack', customError.stack); // Stack trace কনসোলে দেখানো।
    return res.status(customError.status).json({
      message: customError.message, // error মেসেজ রেসপন্সে।
      success: false,
      error: {
        name: customError.name, // ত্রুটির নাম।
        errors: customError.errors, // ত্রুটির বিস্তারিত।
      },
      stack:
        process.env.NODE_ENV === 'development' ? customError.stack : undefined, // ডেভেলপমেন্ট পরিবেশে stack trace দেখানো।
    });
  }

  // B. CastError হ্যান্ডল করা (উদাহরণ: MongoDB ObjectId এর ভুল ফরম্যাট)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}`, // ত্রুটির পথ এবং ভুল ভ্যালু।
      success: false,
      error: {
        name: err.name, // ত্রুটির ধরন।
      },
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // ডেভেলপমেন্টে stack trace দেখানো।
    });
  }

  // C. Generic error fallback: অন্যান্য অজানা ত্রুটি হ্যান্ডল করা।
  const customError = new CustomError(
    err.message || 'Internal Server Error', // ডিফল্ট ত্রুটির মেসেজ।
    err.status || 500 // ডিফল্ট স্ট্যাটাস কোড।
  );
  console.log(customError.stack); // Stack trace কনসোলে দেখানো।
  res.status(customError.status).json({
    message: customError.message, // রেসপন্সে ত্রুটির মেসেজ।
    success: false,
    stack:
      process.env.NODE_ENV === 'development' ? customError.stack : undefined, // ডেভেলপমেন্টে stack trace দেখানো।
  });
};
