const theme = require("./theme.json");
const workbenchDark = require("./workbenchDark.json");
const workbenchGad = require("./workbenchGad.json");
const workbenchUsher = require("./workbenchUsher");
const write = require("write");
const path = require("path");
const build = require("@two-beards/vscode-theme-builder/build");
const themeConfig = require("../theme.config.js");
const deltree = require("deltree");

function handleFile(outWay, workbenchColors = {}, isMerge) {
  // data.tokenColors = data.tokenColors.filter(v => !v.name || v.name && v.name.indexOf('ITALIC') < 0);
  let data = { ...theme };
  Object.keys(workbenchColors).forEach((key) => {
    if (key === "colors" && isMerge) {
      data[key] = { ...data[key], ...workbenchColors[key] };
      return;
    }
    data[key] = workbenchColors[key];
  });
  let outFile = path.resolve(__dirname, outWay);
  return write(outFile, JSON.stringify(data, null, "  "));
}

async function main() {
  const tasks = [
    handleFile("../templates/theme.json"),
    handleFile("../templates/dark.json", workbenchDark),
    handleFile("../templates/gad.json", workbenchGad),
    handleFile("../templates/usher.json", workbenchUsher),
  ];
  await Promise.all(tasks);
  build(themeConfig);
  deltree(path.resolve(__dirname, "../templates/"));
}
try {
  main();
} catch (err) {
  console.error(err);
}
