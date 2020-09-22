const csv = require("./csv.util");

function get_time_since_date(dateFuture) {
  let diffInMilliSeconds = Math.abs(dateFuture - new Date()) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / (60 * 60));

  let difference = "";
  if (days > 0) {
    difference += `${days}d, `;
  }

  difference += hours === 0 || hours === 1 ? `${hours}hr` : `${hours}hrs`;

  return difference;
}

function serveRequest(ctx, transformed_pull_requests, headers, fileName) {
  if (
    ctx.headers.accept.includes("text/csv") ||
    ctx.headers.accept.includes("application/csv")
  ) {
    let file = csv(headers, transformed_pull_requests);
    ctx.set("Content-disposition", `attachment; filename=${fileName}.csv`);
    ctx.body = file;
  } else {
    ctx.set("Content-type", "application/json");
    ctx.body = transformed_pull_requests;
  }

  ctx.status = 200;
  return ctx;
}
module.exports = { get_time_since_date, serveRequest };
