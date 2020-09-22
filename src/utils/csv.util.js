const _ = require("lodash");

module.exports = function writeCSV(headers, data) {
  let fileString = "";
  let separator = ",";

  headers.forEach((h, i) => {
    fileString += h.title;
    if (i !== headers.length - 1) fileString += separator;
  });

  fileString += "\n";

  _.flatMap(data).forEach(r => {
    headers.forEach((c, i) => {
      fileString += JSON.stringify(_.get(r, c.id));
      if (i != headers.length - 1) fileString += separator;
    });
    fileString += "\n";
  });

  return fileString.trim(",");
};
