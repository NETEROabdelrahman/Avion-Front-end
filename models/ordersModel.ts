import { Schema, model,Document, Model,models } from 'mongoose';

interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    order: Schema.Types.ObjectId[];
    quantity: number[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    }],
    quantity: [{
        type: Number,
        required:true
    }],
    totalPrice: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        required: true,
        default:"cart"
    }
 
},
    { timestamps: true });

//const Order = models.Order || model('Order', OrderSchema);
const Order: Model<IOrder> = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;