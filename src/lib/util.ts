import type { Hierarchical } from "$lib/types";

export const toastThemes = {
  error: {
    theme: {
      "--toastBackground": "#ff0000",
      "--toastProgressBackground": "#ff0000",
      "--toastProgressAfterBackground": "#ff0000",
      "--toastColor": "#fff"
    }
  },
  success: {
    theme: {
      "--toastBackground": "#00ff00",
      "--toastProgressBackground": "#00ff00",
      "--toastProgressAfterBackground": "#00ff00",
      "--toastColor": "#fff"
    }
  }
};

export const objectsToHierarchy = (arr: Hierarchical[]) => {
  let arrMap = new Map(arr.map((item: Hierarchical) => [item._id, item]));
  let tree: Hierarchical[] = [];

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
};

export let formatSecondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.floor(seconds % 60);
  return `${minutes}:${secondsRemainder < 10 ? "0" : ""}${secondsRemainder}`;
};
