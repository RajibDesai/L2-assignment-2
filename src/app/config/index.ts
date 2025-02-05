import dotenv from 'dotenv';
import path from 'node:path';

// .env ফাইল লোড করে
dotenv.config({ path: path.join(process.cwd(), '.env') });

// কনফিগারেশন ভেরিয়েবল এক্সপোর্ট করা হচ্ছে
export default {
  port: process.env.PORT || 4000,
  database_url: process.env.DATABASE_URL || '',
};
