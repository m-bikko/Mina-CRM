import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface ISaleItem {
  product: Types.ObjectId;
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
}

export interface ISale {
  date: Date;
  customerPhone: string;
  paymentType: Types.ObjectId;
  paymentTypeName: string;
  taxRateSnapshot: number;
  items: ISaleItem[];
  totalAmount: number;
  taxAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const SaleItemSchema = new Schema<ISaleItem>(
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
  },
  { _id: false }
);

const SaleSchema = new Schema<ISale>(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    paymentType: {
      type: Schema.Types.ObjectId,
      ref: "PaymentType",
      required: true,
    },
    paymentTypeName: {
      type: String,
      required: true,
    },
    taxRateSnapshot: {
      type: Number,
      required: true,
      min: 0,
    },
    items: {
      type: [SaleItemSchema],
      required: true,
      validate: {
        validator: (items: ISaleItem[]) => items.length > 0,
        message: "Sale must have at least one item",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Sale: Model<ISale> =
  models.Sale || mongoose.model<ISale>("Sale", SaleSchema);

export default Sale;
