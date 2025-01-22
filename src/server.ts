import app from './app.js';
import config from './app/config/index.js'; // config/index.ts থেকে কনফিগারেশন ইম্পোর্ট করা
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url).then(() => {
      console.log('Mongoose connected to MongoDB');
    });

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Error connecting to the database', error);
  }
}

main();
