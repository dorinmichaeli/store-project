import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true},
  manufacturer: {type: String, required: true},
  url: {type: String, required: true},
  description: [
    {type: String, required: true},
  ],
  tags: [
    {type: String, required: true},
  ],
});


export function createItemModel(client) {
  return client.model('Item', itemSchema);
}
