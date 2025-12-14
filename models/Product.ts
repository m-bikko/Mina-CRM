import mongoose, { Schema, models, Model } from "mongoose";

export interface IMeasurement {
  parameterName: string;
  value: string;
}

export interface ISize {
  label: string;
  measurements: IMeasurement[];
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

const MeasurementSchema = new Schema<IMeasurement>(
  {
    parameterName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const SizeSchema = new Schema<ISize>(
  {
    label: {
      type: String,
      required: true,
    },
    measurements: {
      type: [MeasurementSchema],
      default: [],
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
