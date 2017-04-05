// 把数据转化为开始节点对象
export function format(data) {
  data.forEach((node) => {
    // 上一个节点
    if (!Array.isArray(node.parent)) {
      node.parent = [];
    }
    node.prev.forEach((id) => {
      for (let i = 0, length = data.length; i < length; i++) {
        if (data[i].id === id) {
          node.parent.push(data[i]);
          break;
        }
      }
    });

    // 下一个节点
    if (!Array.isArray(node.children)) {
      node.children = [];
    }
    node.next.forEach((id) => {
      for (let i = 0, length = data.length; i < length; i++) {
        if (data[i].id === id) {
          node.children.push(data[i]);
          break;
        }
      }
    });
  });
  // 返回第一个节点
  for (let i = 0, length = data.length; i < length; i++) {
    if (data[i].prev.length === 0) {
      return data[i];
    }
  }
}
