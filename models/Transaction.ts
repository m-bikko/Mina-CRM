import mongoose, { Schema, models, Model, Types } from "mongoose";

export type TransactionType = "INCOME" | "EXPENSE";
export type TransactionCategory = "SALE" | "SUPPLY" | "MANUAL_ADJUSTMENT" | "WRITE_OFF" | "RETURN";

export interface ITransaction {
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  reason: string;
  referenceId?: Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ["INCOME", "EXPENSE"],
      required: true,
    },
    category: {
      type: String,
      enum: ["SALE", "SUPPLY", "MANUAL_ADJUSTMENT", "WRITE_OFF", "RETURN"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    reason: {
      type: String,
      required: true,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction: Model<ITransaction> =
  models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
