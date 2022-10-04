import { Document, Schema } from 'mongoose';
import {Post} from './post.model'
const CategoryModel = new Schema(
  {
    title: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
    collection: 'category',
  },
);

export { CategoryModel };

export interface Category extends Document {
  title: string;
  posts: [Post];
}
