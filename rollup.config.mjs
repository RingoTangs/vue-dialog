import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'

// 获取当前文件的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = process.env.NODE_ENV === 'dev'

function getPlugins() {
  const plugins = [
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }),
    // 解析模块路径
    resolve({
      preferBuiltins: true,
      extensions: ['.ts', '.js', '.tsx'],
    }),
    // 将 CommonJS 转换为 ES6 模块
    commonjs(),
    // 支持导入 JSON 文件
    json(),
    // babel
    babel({
      babelHelpers: 'bundled',
      plugins: ['@vue/babel-plugin-jsx'],
      presets: [
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3.40.0',
          },
        ],
      ], // 处理 TypeScript 和 ES6+ 语法
      extensions: ['.ts', '.tsx'], // 支持的文件扩展名
    }),
    postcss({
      plugins: [
        // 自动添加浏览器前缀
        autoprefixer({ overrideBrowserslist: ['> 1%', 'last 2 versions'] }),
      ],
      extract: true, // 将 CSS 提取为单独文件
      minimize: !isDev, // 压缩 CSS
      sourceMap: isDev, // 生成 sourceMap
    }),
  ]

  if (!isDev) {
    plugins.push(terser())
  }

  return plugins
}

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: isDev,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: isDev,
    },
  ],
  external: ['vue'],
  plugins: getPlugins(),
})
