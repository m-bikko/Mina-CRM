import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface IReturnItem {
  product: Types.ObjectId;
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
  costPrice: number;
}

export interface IReturn {
  sale: Types.ObjectId;
  date: Date;
  customerPhone: string;
  paymentTypeName: string;
  items: IReturnItem[];
  totalAmount: number;
  totalCostPrice: number;
  refundAmount: number;
  taxAmountReversed: number;
  bankCommissionLost: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReturnItemSchema = new Schema<IReturnItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    sizeLabel: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    priceAtSale: {
      type: Number,
      required: true,
      min: 0,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const ReturnSchema = new Schema<IReturn>(
  {
    sale: {
      type: Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    paymentTypeName: {
      type: String,
      required: true,
    },
    items: {
      type: [ReturnItemSchema],
      required: true,
      validate: {
        validator: (items: IReturnItem[]) => items.length > 0,
        message: "Return must have at least one item",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalCostPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    refundAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    taxAmountReversed: {
      type: Number,
      required: true,
      min: 0,
    },
    bankCommissionLost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Return: Model<IReturn> =
  models.Return || mongoose.model<IReturn>("Return", ReturnSchema);

export default Return;
