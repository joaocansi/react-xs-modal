import scss from 'rollup-plugin-scss';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageConfig from './package.json';

import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packageConfig.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: packageConfig.module,
        format: 'esm',
        sourcemap: true,
      }
    ],
    plugins: [
      // sass({ insert: true }),
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      scss({
        output: 'dist/css/index.css',
        failOnError: true,
      })
    ],
    external: ["react", "react-dom"]
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.scss$/]
  }
]