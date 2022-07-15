export type TreeData = {
    name: string;
    children: {
        name: string;
        children: {
            name: string;
        }[];
    }[];
};