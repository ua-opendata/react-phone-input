// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import esmImportToUrl from 'rollup-plugin-esm-import-to-url';

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
            // rootDir: "src/"
        })]
    },
    {
        input: 'example/index.tsx',
        output: {
            file: 'docs/bundle.js',
            format: 'esm',
        },
        external: [],
        plugins: [
            typescript(),
            esmImportToUrl({
                imports: {
                    'react': 'https://esm.sh/react@18/?dev',
                    'react-dom/client': 'https://esm.sh/react-dom@18/client?dev',
                    'react-input-mask': 'https://esm.sh/react-input-mask@2?dev',
                    'dom-event-simulate': 'https://esm.sh/dom-event-simulate@1.2.1?dev',
                },
            })
        ],
    },
]
