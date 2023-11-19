import { Schema, model,Model,Document, models } from 'mongoose';

interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  desc: string;
  photos?: string[];
  descPoints?: string[];
  height?: number;
  width?: number;
  depth?: number;
  amount: number;
}

const productSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required:true
    },
    desc: {
      type: String,
      required:true
    },
    photos: {
      type: [String]
    },
    descPoints: { type: [String], required: false },
    height: {
      type: Number,
      required:false
    },
    width: {
      type: Number,
      required:false
    },
    depth: {
      type: Number,
      required:false
    },
    amount: {
      type: Number,
      required:true
    }
  });

//const Product = models.Product || model('Product', productSchema);
const Product: Model<IProduct> = models.Product || model<IProduct>('Product', productSchema);

export default Product;