import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const BABEL_PLUGINS = [
  '@babel/plugin-transform-parameters',
  '@babel/plugin-proposal-optional-chaining',
  ['@babel/plugin-transform-spread', { loose: true, useBuiltIns: true }],
  '@babel/plugin-transform-arrow-functions',
  ['@babel/plugin-transform-destructuring', { loose: true, useBuiltIns: true }],
  '@babel/plugin-transform-block-scoping',
  '@babel/plugin-transform-computed-properties',
  '@babel/plugin-transform-shorthand-properties',
];

export const OUTPUT_PATH = 'dist';

export function mergeEntryConfig(options = {}) {
  const plugins = options.plugins || [];
  const output = options.output || {};

  delete options.plugins;
  delete options.output;

  return {
    input: 'lib/index.js',
    output: {
      freeze: false,
      interop: false,
      sourcemap: true,
      ...output,
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        configFile: false,
        presets: [],
        plugins: [...BABEL_PLUGINS],
      }),
      nodeResolve(),
      ...plugins,
    ],
    ...options,
  };
}
