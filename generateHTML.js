var fs = require("fs");
var util = require("util");
var puppeteer = require("puppeteer");

var readFilePromise = util.promisify(fs.readFile);
var writeFilePromise = util.promisify(fs.writeFile);

var generateFileName = function(fileExtension = "html") {
  return `./${new Date().getTime()}.${fileExtension}`;
};

var easy = async function(username, data) {
  var htmlString = `<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>${username}</title>
 </head>
 <body>
 <h1> Hello, my name is ${username}. My GitHub informtion is ${data}</h1>
   </body>
   </html>`;

  await writeFilePromise(generateFileName(), htmlString);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlString);
  await page.pdf({ path: generateFileName("pdf"), format: "A4" });

  await browser.close();
};

module.exports = {
  easy
};
