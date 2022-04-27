export const treeToArray = (tree: any) => {
  let stack = tree,
    result = [];
  while (stack.length !== 0) {
    let pop = stack.pop();
    result.push({
      id: pop.id,
      name: pop.name,
      pid: pop.pid,
    });
    let children = pop.children;
    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return result;
};

export const findTreeNodeInTree: any = (
  tree: any,
  nodeId: string,
  idAttr: string = 'key'
) => {
  let target = null;
  for (let i = 0; i < tree.length; i++) {
    const treeNode = tree[i];
    const { children } = treeNode;
    if (treeNode[idAttr] === nodeId) {
      return (target = treeNode);
    }
    if (children?.length) {
      return findTreeNodeInTree(children, nodeId, idAttr);
    }
  }
  return target||{};
};

/**
 * 查找某一节点在树中路径
 */

export const getNodePath = (tree: any, id: string) => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }
  const path: any[] = [];
  const treeFindPath = (tree: any, id: string, path: any[]) => {
    for (const item of tree) {
      path.push(item);
      if (item.bspCode === id) {
        return path;
      }
      if (item.children) {
        const findChildren: any = treeFindPath(item.children, id, path);
        if (findChildren.length) {
          return findChildren;
        }
      }
      path.pop();
    }
    return [];
  };
  return treeFindPath(tree, id, path);
};
