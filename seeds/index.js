const fs = require("fs");
const util = require("util");
const mongoose = require("mongoose");
const path = require("path");

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// convert readdir to a promise
const readDir = util.promisify(fs.readdir);

async function seedDB() {
  // get list of all files in directory
  // __dirname = seeds
  const dir = await readDir(__dirname);

  // get all files that match *seed.js format
  const seedFiles = dir.filter((f) => f.endsWith(".seed.js"));

  for (const file of seedFiles) {
    const fileName = file.split(".seed.js")[0];
    const modelName = toTitleCase(fileName);
    const model = mongoose.models[modelName];

    if (!model) throw new Error(`Cannot find Model '${modelName}'`);

    const fileContents = require(path.join(__dirname, file));

    await model.create(fileContents);
  }
}

exports.seedDB = seedDB;
