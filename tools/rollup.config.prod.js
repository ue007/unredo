import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: './src/memento.ts',
	output: [
		{
			file: 'dist/unredo.js',
			format: 'iife',
			name: 'unredo',
			sourcemap: true,
			paths: (id) => {}
		},
		{
			file: 'docs/libs/unredo.js',
			format: 'iife',
			name: 'unredo',
			sourcemap: true,
			paths: (id) => {}
		}
	],
	plugins: [
		resolve({
			customResolveOptions: {
				moduleDirectory: 'node_modules'
			}
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**'
		}),
		typescript()
		// terser()
	]
	// 指出应将哪些模块视为外部模块
	// external: ['lodash']
};
