import { Document, model, Model, Schema } from "mongoose";

export interface IBan extends Document {
  twitch_id: string;
  twitch_name: string;
  channel: string;
  reason: string;
  expires_at: string;
  scores?: { category1: number; category2: number; category3: number };
  message?: string;
}

const BanSchema: Schema = new Schema({
  twitch_id: { type: String, required: true, unique: true },
  twitch_name: { type: String, required: true },
  channel: { type: String, required: true },
  reason: { type: String, required: true },
  expires_at: { type: String, required: true },
  scores: {
    category1: { type: Number, required: false },
    category2: { type: Number, required: false },
    category3: { type: Number, required: false },
  },
  message: { type: String, required: false },
});

const Ban: Model<IBan> = model("Ban", BanSchema);
export default Ban;
