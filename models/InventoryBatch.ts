import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface IInventoryBatch {
  product: Types.ObjectId;
  productName: string;
  sizeLabel: string;
  supply: Types.ObjectId | null; // null for legacy products before supply system
  costPrice: number;
  initialQuantity: number;
  remainingQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryBatchSchema = new Schema<IInventoryBatch>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    productName: {
      type: String,
      required: true,
    },
    sizeLabel: {
      type: String,
      required: true,
    },
    supply: {
      type: Schema.Types.ObjectId,
      ref: "Supply",
      required: false, // null for legacy products before supply system
      index: true,
      default: null,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    initialQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    remainingQuantity: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Составной индекс для FIFO выборки
InventoryBatchSchema.index({ product: 1, sizeLabel: 1, createdAt: 1 });

const InventoryBatch: Model<IInventoryBatch> =
  models.InventoryBatch ||
  mongoose.model<IInventoryBatch>("InventoryBatch", InventoryBatchSchema);

export default InventoryBatch;
