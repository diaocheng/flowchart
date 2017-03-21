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
  'rules': {
    // 箭头函数变量括号
    'arrow-parens': ['error', 'always'],
    // generator函数名与function的空格
    'generator-star-spacing': 0,
    // 末尾分号
    'semi': ['error', 'always'],
    // 函数括号前面是否有空格
    'space-before-function-paren': ['error', 'never']
  }
}
