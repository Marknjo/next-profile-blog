//IMPORTS
// Globals

import { env } from 'process';

// 3rd Party
import mongoose from 'mongoose';

let dbIsConnected = false;

// SETUP DB
const connectToDB = () => {
  try {
    console.log('> Connecting to mongodb server...');

    let dbConnection: string = env.DB_MONGO_LOCAL!;

    if (env.DB_IS_ONLINE === 'true') {
      // Make online mongodb connection string
      // const pass = env.DB_MONGO_PASS;
      // const coll = env.DB_MONGO_COLLECTION;
      // dbConnection = env.DB_MONGO_ONLINE.replace('<PASSWORD>', pass).replace(
      //   '<COLLECTION>',
      //   coll
      // );
    }

    // Return success message
    mongoose.connect(dbConnection, {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });

    dbIsConnected = true;

    console.log('🙌🙌🙌 Connection to MongoDb successful...');
  } catch (error: any) {
    console.error(`💥💥💥 ${error.name} ${error.message}`);
    console.log(error.stack);
    dbIsConnected = false;
  }
};

if (!dbIsConnected) {
  connectToDB();
}
