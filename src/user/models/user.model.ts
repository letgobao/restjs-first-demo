import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    firstname: String,
    lastname: String,
    isadmin: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
    collection: 'user',
  },
);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'creator',
  justOne: false,
})
export {UserSchema}

export interface User extends Document {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    isadmin: boolean;
}