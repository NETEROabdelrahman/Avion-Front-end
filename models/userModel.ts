import { Schema, model,Model,Document, models } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: string;
  country: string;
  img?: string;
  city: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }

  },
  { timestamps: true });

//const User = models.User || model("User", UserSchema);
const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;