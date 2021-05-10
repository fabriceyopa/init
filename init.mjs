#!/usr/bin/env zx
import slug from "slug";
import fs from "fs";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GH_TOKEN });

let username = await question("Enter your project name : ");
let currentDir = await $`pwd`;
let fullPath = `${currentDir}/${slug(username)}`;
let cleanPath = fullPath.replace(/[\r\n]/g, "");
console.log(chalk.blue(`We are initialising a new Git Project : ${cleanPath}`));
if (fs.existsSync(cleanPath)) {
  console.log("Directory exists! Please cd into");
} else {
  await $`mkdir -p ${cleanPath}`;
  cd(cleanPath);
  await $`git init`;
  console.log(chalk.green("The project have been correctly initialize"));
}
