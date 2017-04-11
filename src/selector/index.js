import Selector from './selector';
import './polyfill';
// 导出选择符函数
export default function (selector) {
  return new Selector(selector);
}
