import mongoose, { Schema, models, Model } from "mongoose";

export interface ISize {
  label: string;
  quantity: number;
}

export interface IProduct {
  name: string;
  price: number;
  images: string[];
  sizes: ISize[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SizeSchema = new Schema<ISize>(
  {
    label: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [SizeSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
