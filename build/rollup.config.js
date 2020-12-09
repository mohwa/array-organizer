import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';
import { OUTPUT_PATH, mergeEntryConfig } from './utils';

export default [
  mergeEntryConfig({
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      plugins: [terser()],
    },
  }),
  mergeEntryConfig({
    output: {
      file: pkg.main,
      format: 'umd',
      exports: 'named',
      name: pkg.name,
      sourcemap: false,
    },
  }),
  mergeEntryConfig({
    output: {
      file: `${OUTPUT_PATH}/${pkg.name}.min.js`,
      format: 'umd',
      exports: 'named',
      name: pkg.name,
      plugins: [uglify()],
    },
  }),
];
