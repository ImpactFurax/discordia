import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  _id: string;
  comment: string;
  createdAt: Date;
  author: { _id: string, username: string };
  thread: { _id: string };
}

const CommentSchema = new Schema({
  comment: { type: String, required:true },
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' }, 
  thread: { type: Schema.Types.ObjectId, ref: 'Thread'},
})

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;