import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: './src/exports.ts',
    plugins: [
        resolve({
            browser: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        typescript({ target: "es5" }),
        uglify()
    ],
    output: {
        name: 'boltApi',
        file: './umd/boltIotWrapper.min.js',
        format: 'umd',
        strict: true
    }

}