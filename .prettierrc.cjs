module.exports = {
  // 每行最大列，超过换行
  printWidth: 120,
  // 箭头函数只有一个参数的时候可以忽略括号
  arrowParens: 'avoid',
  // 缩进
  tabWidth: 2,
  // 使用空格缩进
  useTabs: false,
  // 行结束符使用 Unix 格式
  endOfLine: 'lf',
  // 换行方式
  proseWrap: 'preserve',
  // 分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 在JSX中使用单引号而不是双引号
  // jsxSingleQuote: true,
  // 对象、数组括号内部要有空格
  bracketSpacing: true,
  // 后置逗号，多行对象、数组在最后一行增加逗号
  trailingComma: 'es5',
  parser: 'typescript',
};
