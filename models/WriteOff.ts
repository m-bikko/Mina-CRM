import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface IWriteOffItem {
  inventoryBatch: Types.ObjectId;
  product: Types.ObjectId;
  productName: string;
  sizeLabel: string;
  quantity: number;
  costPrice: number;
  supplyDate: Date;
}

export interface IWriteOff {
  date: Date;
  items: IWriteOffItem[];
  totalRefund: number;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

const WriteOffItemSchema = new Schema<IWriteOffItem>(
  {
    inventoryBatch: {
      type: Schema.Types.ObjectId,
      ref: "InventoryBatch",
      required: true,
    },
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
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    supplyDate: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const WriteOffSchema = new Schema<IWriteOff>(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    items: {
      type: [WriteOffItemSchema],
      required: true,
      validate: {
        validator: (items: IWriteOffItem[]) => items.length > 0,
        message: "Write-off must have at least one item",
      },
    },
    totalRefund: {
      type: Number,
      required: true,
      min: 0,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WriteOff: Model<IWriteOff> =
  models.WriteOff || mongoose.model<IWriteOff>("WriteOff", WriteOffSchema);

export default WriteOff;
