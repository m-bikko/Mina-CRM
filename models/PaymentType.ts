import mongoose, { Schema, models, Model } from "mongoose";

export interface IPaymentType {
  name: string;
  taxRate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentTypeSchema = new Schema<IPaymentType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    taxRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
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

const PaymentType: Model<IPaymentType> =
  models.PaymentType ||
  mongoose.model<IPaymentType>("PaymentType", PaymentTypeSchema);

export default PaymentType;
