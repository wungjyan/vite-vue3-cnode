module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true // 开启 setup 语法糖
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
