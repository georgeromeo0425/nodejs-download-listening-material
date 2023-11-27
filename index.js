const axios = require("axios");
const fs = require("fs");

const downData = [
  {
    collection: "smalltalk",
    total: 24,
  },
];

const downloadFile = async (url, path) => {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const get2LenNum = (num) => {
  if (num < 10) return `0${num}`;
  return num;
};

const makeFileList = () => {
  for (let item of downData) {
    const { collection, total } = item;
    fs.mkdir(`./downloads/${collection}`);
    for (let idx = 1; idx <= 3; idx++) {}
  }
};

const downloadFiles = async () => {
  const filesToDownload = makeFileList();

  for (const file of filesToDownload) {
    try {
      await downloadFile(file.url, file.path);
      console.log(`Downloaded ${file.url} to ${file.path}`);
    } catch (error) {
      console.error(`Error downloading ${file.url}: ${error}`);
    }
  }
};

downloadFiles();
