// http://eslint.org/docs/user-guide/configuring

module.exports = {
  // 设置当前文件夹为根目录
  'root': true,
  // 解析规则
  'parser': 'babel-eslint',
  // 解析选项
  'parserOptions': {
    'sourceType': 'module'
  },
  // 运行环境
  'env': {
    'browser': true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  'extends': 'standard',
  // 规则
  'rules': {}
}
