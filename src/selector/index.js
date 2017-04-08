import Selector from './selector';
// 导出选择符函数
export default function (selector) {
  return new Selector(selector);
}
