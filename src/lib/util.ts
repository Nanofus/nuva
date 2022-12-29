import type { Hierarchical } from '$lib/types';

export const objectsToHierarchy = (arr: Hierarchical[]) => {
    let arrMap = new Map(arr.map((item: Hierarchical) => [item._id, item]));
    let tree = [];

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];

        if (item._parentId) {
            let parentItem = arrMap.get(item._parentId);

            if (parentItem) {
                let { children } = parentItem;

                if (children) {
                    parentItem.children.push(item);
                } else {
                    parentItem.children = [item];
                }
            }
        } else {
            tree.push(item);
        }
    }

    return tree;
}
