export type TreeData = {
    name: string;
    children: {
        name: string;
        children: {
            name: string;
        }[];
    }[];
};

export type Highlight = "" | "survival" | "extinction"
