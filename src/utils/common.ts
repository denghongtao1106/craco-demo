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

/* 
通过某一属性找到树中的节点
 */
export const findTreeNodeInTree = (
  element: any,
  id: string,
  idAttr: string = "key"
): any => {
  // 根据id查找节点
  return findNode(element, (node: any) => {
    return node[idAttr] === id;
  });
};

/* 
通过指定的查询规则查找树节点
 */
export const findNode = (tree: any, func: any): any => {
  for (const node of tree) {
    if (func(node)) return node;
    if (node.children) {
      const res = findNode(node.children, func);
      if (res) return res;
    }
  }
  return null;
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
