import mongoose from 'mongoose';

import environment from '../env';
import logger from '../helpers/logger';

export class MongoConnection {
  public connect(): void {
    const mongoDB = `mongodb://localhost/${environment.getDBName()}`;

    // @ts-ignore
    mongoose.connect(mongoDB, error => {
      if(error)
        logger.error(error.message);
    });

    const db = mongoose.connection;

    db.once('open', function () {
      logger.log(`Mongo: Connected to database ${environment.getDBName()}`);
    });
  }
}
