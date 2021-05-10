#!/usr/bin/env zx
import slug from "slug";
import fs from "fs";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GH_TOKEN });
const repoConfig = {
  private: true,
};

let projectName = await question("Enter your project name : ");
let currentDir = await $`pwd`;
let fullPath = `${currentDir}/${slug(projectName)}`;
let cleanPath = fullPath.replace(/[\r\n]/g, "");
console.log(chalk.blue(`We are initialising a new Git Project : ${cleanPath}`));
if (fs.existsSync(cleanPath)) {
  console.log("Directory exists! Please cd into");
} else {
  await $`mkdir -p ${cleanPath}`;
  cd(cleanPath);
  await $`git init`;
  await octokit.request("POST /user/repos", {
    name: projectName,
    ...repoConfig,
  });
  console.log(chalk.green("The project have been correctly initialize"));
}
