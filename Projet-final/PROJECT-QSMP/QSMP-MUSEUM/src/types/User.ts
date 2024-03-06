import type { Artwork } from "./Artwork";
import type { Comment } from "./Comment";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    comments: Comment[];
    likes: Artwork[];
}