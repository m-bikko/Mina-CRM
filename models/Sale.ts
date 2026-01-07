import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface IBatchAllocation {
  batch: Types.ObjectId;
  quantity: number;
  costPrice: number;
}

export interface ISaleItem {
  product: Types.ObjectId;
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
  batchAllocations: IBatchAllocation[];
  totalCostPrice: number;
}

export interface ISale {
  date: Date;
  customerPhone: string;
  paymentType: Types.ObjectId;
  paymentTypeName: string;
  taxRateSnapshot: number;
  bankCommissionRateSnapshot: number;
  items: ISaleItem[];
  totalAmount: number;
  taxAmount: number;
  bankCommissionAmount: number;
  totalCostPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const BatchAllocationSchema = new Schema<IBatchAllocation>(
  {
    batch: {
      type: Schema.Types.ObjectId,
      ref: "InventoryBatch",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

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
    batchAllocations: {
      type: [BatchAllocationSchema],
      required: true,
      default: [],
    },
    totalCostPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
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
    bankCommissionRateSnapshot: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
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
    bankCommissionAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    totalCostPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Sale: Model<ISale> =
  models.Sale || mongoose.model<ISale>("Sale", SaleSchema);

export default Sale;
