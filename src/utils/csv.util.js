const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = function writeCSV(headers, data) {
  let fileString = '';
  let separator = ',';

  headers.forEach(h => {
    fileString += `${h.title}${separator}`;
  });

  fileString += '\n';

  _.flatMap(data).forEach(r => {
    headers.forEach((c, i) => {
      fileString += `${_.get(r, c.id)}`;
      if (i != headers.length - 1) fileString += separator;
    });
    fileString += '\n';
  });

  return fileString;
};
