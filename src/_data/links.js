const Airtable = require("airtable");

const ELEVENTY_ENV = process.env.ELEVENTY_ENV || "development";

/**
 * Loads all links from my Airtable database.
 */
async function airtableRecords() {
  const AIRTABLE_BASE_ID = "app4qb1AkwWAND48o";
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_ENDPOINT = "https://api.airtable.com";

  const base = new Airtable({
    endpointUrl: AIRTABLE_ENDPOINT,
    apiKey: AIRTABLE_API_KEY,
  }).base(AIRTABLE_BASE_ID);

  const records = await new Promise((resolve, reject) => {
    const items = [];

    const onPage = (records, fetchNextPage) => {
      records.forEach(function (record) {
        items.push(record);
      });
      fetchNextPage();
    };

    const onDone = (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    };

    base("Links")
      .select({
        maxRecords: 1000,
        view: "Raw",
      })
      .eachPage(onPage, onDone);
  });

  return records.map((record) => ({
    title: record.get("Title"),
  }));
}

/**
 * Used during development do I don't have to have my AIRTABLE_API_KEY
 * around when I'm just developing.
 */
function mockRecords() {
  return [
    { title: "Inhumanity of Root Cause Analysis" },
    { title: "Awesome limits" },
  ];
}

module.exports = async () => {
  switch (ELEVENTY_ENV) {
    case "development":
      return mockRecords();
    case "production":
      return await airtableRecords();
    default:
      throw new Error(`Unsupported ELEVENTY_ENV ${ELEVENTY_ENV}`);
  }
};
