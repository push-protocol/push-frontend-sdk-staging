import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

import pkg from "./package.json";

export default [
  // output for the web version
  {
    input: "src/web/index.tsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    preferBuiltins: false,
    globals: { "styled-components": "styled" },
    plugins: [resolve(), commonjs(), typescript(), json()],
    external: [
      "react",
      "react-dom",
      "styled-components",
      "moment",
      "prop-types",
      "html-react-parser",
      "axios",
    ],
  },

  // output for the mobile version
  {
    input: "src/mobile/index.tsx",
    output: [
      {
        file: "dist/native.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    preferBuiltins: false,
    globals: { "styled-components": "styled" },
    plugins: [resolve(), commonjs(), typescript(), json()],
    external: [
      "react",
      "styled-components/native",
      "react-native-modal",
      "react-native",
      "react-native-youtube",
      "react-native-video",
      "react-native-device-detection",
      "react-native-parsed-text",
      "moment",
      "prop-types",
      "html-react-parser",
      "axios",
    ],
  },
];
