import { Types } from 'mongoose';

export interface IOrder {
  email: string; // কাস্টমারের ইমেইল ঠিকানা
  product: Types.ObjectId; // বাইকের ObjectId (MongoDB থেকে)
  quantity: number; // অর্ডারকৃত বাইকের পরিমাণ
  totalPrice: number; // মোট মূল্য (দাম * পরিমাণ)
}
