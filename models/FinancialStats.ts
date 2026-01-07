import mongoose, { Schema, models, Model } from "mongoose";

export interface IFinancialStats {
  currentBalance: number;
  updatedAt: Date;
}

const FinancialStatsSchema = new Schema<IFinancialStats>(
  {
    currentBalance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

const FinancialStats: Model<IFinancialStats> =
  models.FinancialStats ||
  mongoose.model<IFinancialStats>("FinancialStats", FinancialStatsSchema);

export default FinancialStats;
