import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
	input: './src/memento/index.ts',
	output: [
		{
			file: 'dist/unredo.es.js',
			format: 'es',
			sourcemap: true,
			paths: (id) => {}
		},
		{
			file: 'dist/unredo.cjs.js',
			format: 'cjs',
			sourcemap: true,
			paths: (id) => {}
		},
		{
			file: 'dist/unredo.js',
			format: 'umd',
			sourcemap: true,
			name: 'unredo',
			paths: (id) => {}
		}
	],
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**'
		}),
		typescript(),
		// terser()
	]
};
