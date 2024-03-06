import type { Artwork } from "./Artwork";

export interface Character {
    id: number;
    name: string;
    description: string;
    artwork: Artwork[];
}