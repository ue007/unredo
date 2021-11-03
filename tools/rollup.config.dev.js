import typescript from '@rollup/plugin-typescript';

export default {
	input: './src/memento.ts',
	output: {
		file: 'dist/unredo.es.js',
		format: 'es',
		sourcemap: true,
		paths: (id) => {}
	},
	plugins: [typescript()]
};
