// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'

export default [
    {
        input: 'src/index.tsx',
        output: {
            dir: 'dist',
            format: 'es'
        },
        external: ['react', 'react-input-mask',],
        plugins: [typescript({
            declaration: true,
            declarationDir: "dist",
            include: ["src/index.tsx",],
            rootDir: "src/"
        }), del({targets: "dist/*"})]
    },
    {
        input: 'example/index.tsx',
        output: {
            file: 'docs/bundle.js',
            format: 'iife',
            globals: {
                'react': "React",
                'react-dom': "ReactDOM",
                'react-input-mask': "ReactInputMask",
                'dom-event-simulate': "_macaca_simulate",
            },
        },
        external: ['react', 'react-dom', 'react-input-mask', 'dom-event-simulate'],
        plugins: [
            typescript(),
            del({targets: "docs/bundle.js"}),
        ],
    },
]
