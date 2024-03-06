import type { Character } from "./Character";
import type { Comment } from "./Comment";

export interface Artwork {
    id: number;
    artworkLink: string;
    characters: Character[];
    artistName: string;
    description: string;
    likeCount: number;
    displayedInMuseum: boolean;
    comments: Comment[];
}