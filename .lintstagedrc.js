const path = require("path");

const lint = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;
const format = "prettier --write --ignore-path .prettierignore";

module.exports = {
  "*.{js,ts,tsx}": [lint, format],
};
