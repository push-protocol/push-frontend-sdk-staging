import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from '@rollup/plugin-json';


import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  globals: { "styled-components": "styled" },
  plugins: [resolve(), commonjs(), typescript(), json()],
  external: ["react", "react-dom", "styled-components", "moment", "prop-types", 'html-react-parser', 'axios'],
};
