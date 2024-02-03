#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

const projectName = process.argv[2];



if (!projectName) {
  console.error("Please specify the name of your project.");
  console.error("For example:");
  console.error("    npx nex-init my-new-project");
  process.exit(1);
}

const templateDir = path.join(__dirname, "../template");

const destDir = path.join(process.cwd(), projectName);

fs.copy(templateDir, destDir)
  .then(() => {
    const packageJsonPath = path.join(destDir, 'package.json');
    return fs.readJson(packageJsonPath);
  })
  .then(packageJson => {
    packageJson.name = projectName;
    return fs.writeJson(path.join(destDir, 'package.json'), packageJson, { spaces: 2 });
  })
  .then(() => {
    console.log(`Project "${projectName}" has been successfully created.`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
