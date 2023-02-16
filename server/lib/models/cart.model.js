import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  items: [
    {type: String, required: true, ref: 'Item'},
  ],
});

export function createCartModel(client) {
  return client.model('Cart', cartSchema);
}
