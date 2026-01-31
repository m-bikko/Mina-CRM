import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface ISize {
  label: string;
  quantity: number;
}

export interface IProduct {
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  sizes: ISize[];
  isActive: boolean;
  sortOrder: number;
  relatedProducts: Types.ObjectId[];
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
    discountPrice: {
      type: Number,
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
    sortOrder: {
      type: Number,
      default: 0,
    },
    relatedProducts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
