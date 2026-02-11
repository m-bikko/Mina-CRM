import mongoose, { Schema, models, Model } from "mongoose";

export interface IPageVisit {
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PageVisitSchema = new Schema<IPageVisit>(
    {
        timestamp: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const PageVisit: Model<IPageVisit> =
    models.PageVisit || mongoose.model<IPageVisit>("PageVisit", PageVisitSchema);

export default PageVisit;
