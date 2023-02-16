import mongoose from 'mongoose';
import {createItemModel} from '../models/item.model.js';
import {createCartModel} from '../models/cart.model.js';
import {createOrderModel} from '../models/order.model.js';

class ModelService {
  constructor(client) {
    this._client = client;
    this.itemModel = createItemModel(client);
    this.cartModel = createCartModel(client)
    this.orderModel = createOrderModel(client)
  }

  // FIXME: Call this somewhere!
  async close() {
    await this._client.disconnect();
  }
}

// The [model] service allows accessing the database's data models.
export async function createModelService(config) {
  // Set global defaults.
  // It's a bit ugly to do it here, but it seems to be the only fitting place.
  // See: https://mongoosejs.com/docs/guide.html#strict
  mongoose.set('strict', true);
  mongoose.set('strictPopulate', true);
  mongoose.set('strictQuery', true);

  // Construct a MongoDB URI and options object.
  const host = decodeURIComponent(config.mongo.host);
  const port = decodeURIComponent(config.mongo.port);
  const database = decodeURIComponent(config.mongo.database);
  const uri = `mongodb://${host}:${port}/${database}`;
  const options = {
    authSource: 'admin',
    user: config.mongo.username,
    pass: config.mongo.password,
    serverSelectionTimeoutMS: 3000,
  };
  // Create a new MongoClient and wait for it to connect.
  const client = await mongoose.connect(uri, options);
  // Return a new MongoDb instance.
  return new ModelService(client);
}

