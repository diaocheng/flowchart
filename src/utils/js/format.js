// 把数据转化为开始节点对象
export default function (data) {
  return data.map(node => {
    for (let i = 0, length = data.length; i < length; i++) {
      const pIndex = node.prev.indexOf(data[i].id);
      if (pIndex !== -1) {
        node.prev[pIndex] = data[i];
      }
      const nIndex = node.next.indexOf(data[i].id);
      if (nIndex !== -1) {
        node.next[nIndex] = data[i];
      }
    }
    return node;
  });
}
