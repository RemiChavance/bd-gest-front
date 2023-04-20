import { Bd } from "./bd.model";

export class Author {
    id!: number;
    name!: string;
    bds?: Bd[];
}
