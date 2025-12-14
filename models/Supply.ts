import mongoose, { Schema, models, Model, Types } from "mongoose";

export interface ISupplyItem {
  product: Types.ObjectId;
  productName: string;
  sizeLabel: string;
  quantity: number;
  costPrice: number;
}

export interface ISupply {
  date: Date;
  items: ISupplyItem[];
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}

const SupplyItemSchema = new Schema<ISupplyItem>(
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
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const SupplySchema = new Schema<ISupply>(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    items: {
      type: [SupplyItemSchema],
      required: true,
      validate: {
        validator: (items: ISupplyItem[]) => items.length > 0,
        message: "Supply must have at least one item",
      },
    },
    totalCost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Supply: Model<ISupply> =
  models.Supply || mongoose.model<ISupply>("Supply", SupplySchema);

export default Supply;
