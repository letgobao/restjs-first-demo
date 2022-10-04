import { Category } from './catogory.model';
import { User } from '../../user/models/user.model';
import { Document, Schema } from 'mongoose';

const PostModel = new Schema(
  {
    desc: String,
    likes: Number,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }]
  },
  {
    timestamps: true,
    collection: 'post',
  },
);

export {PostModel};

export interface Post extends Document {
    desc: string,
    likes: number;
    creator: User;
    categories: Category;
}

