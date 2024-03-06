import type { Artwork } from "./Artwork";
import type { User } from "./User";

export interface Comment {
    id: number;
    content: string;
    artwork: Artwork;
    user: User;
}