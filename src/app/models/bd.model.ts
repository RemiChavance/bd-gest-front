import { Author } from "./author.model";

export class Bd {
    isbn!: string;
    title!: string;
    serie!: number;
    numSerie?: number;
    image?: string;
    authorDraw!: Author;
    authorScript!: Author;
    isShared?: boolean;
}
