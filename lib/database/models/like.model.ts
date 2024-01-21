import { Document, Schema, model, models } from "mongoose";

export interface ILike extends Document {
  _id: string;
  createdAt: Date;
  author: { _id: string, username: string };
  thread: { _id: string };
}

const LikedSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread'},
})

const Like = models.Like || model('Like', LikedSchema);

export default Like;