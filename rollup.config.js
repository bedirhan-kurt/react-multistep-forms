import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

import packageJson from "./package.json" with { type: "json" };

export default [
    // 1. JS Build: CJS + ESM
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        external: ["react", "react-dom"],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss(),
            terser(),
        ],
    },

    // 2. Type definitions (d.ts) build
    {
        input: "src/index.ts",
        output: [{ file: packageJson.types, format: "es" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];