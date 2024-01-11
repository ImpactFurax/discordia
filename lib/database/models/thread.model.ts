import { Document, Schema, model, models } from "mongoose";

export interface IThread extends Document {
  _id: string;
  title: string;
  description: string;
  summary: string;
  createdAt: Date;
  imageUrl: string;
  author: { _id: string, firstName: string, lastName: string }
}

const ThreadSchema = new Schema({
  title: { type: String, required:true },
  description: { type: String },
  summary: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }, 
})

const Thread = models.Thread || model('Thread', ThreadSchema);

export default Thread;