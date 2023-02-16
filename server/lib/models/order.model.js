import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  userId: {type: String, required: true},
  userName: {type: String, required: true},
  userEmail: {type: String, required: true},
  price: {type: Number, required: true},
  date: {type: Date, required: true},
  items: [
    {type: String, required: true, ref: 'Item'},
  ],
});

export function createOrderModel(client) {
  return client.model('Order', orderSchema);
}
