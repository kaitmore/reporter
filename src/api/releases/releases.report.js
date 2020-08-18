/**
 * Takes an array of epics and returns an epic report
 */

const headers = [
  {
    id: "release_id",
    title: "ID"
  },
  { id: "title", title: "Title" },
  {
    id: "description",
    title: "Description"
  },
  {
    id: "desired_end_date",
    title: "Desired End Date"
  },
  {
    id: "state",
    title: "Status"
  }
];

module.exports = { headers };
