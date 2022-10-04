import { User } from "src/user/models/user.model";
import { IsNotEmpty } from "class-validator";
export class PostInfo {
    desc: string;
    likes: number;
    @IsNotEmpty() creator: User;
    categories: [string];
}