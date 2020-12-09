import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export const OUTPUT_PATH = 'dist';

export function mergeEntryConfig(options = {}) {
  const plugins = options.plugins || [];
  const output = options.output || {};

  delete options.plugins;
  delete options.output;

  return {
    input: 'lib/index.js',
    output: {
      interop: true,
      sourcemap: true,
      ...output,
    },
    plugins: [babel({ exclude: 'node_modules/**' }), nodeResolve(), ...plugins],
    ...options,
  };
}
