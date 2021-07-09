const Airtable = require("airtable");

const ELEVENTY_ENV = process.env.ELEVENTY_ENV || "development";

/**
 * Loads all links from my Airtable database.
 */
async function airtableRecords() {
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_KEY = process.env.AIRTABLE_KEY;
  const AIRTABLE_ENDPOINT = "https://api.airtable.com";

  if (!AIRTABLE_BASE_ID) {
    throw new Error("Missing environment variable: AIRTABLE_BASE_ID")
  }

  if (!AIRTABLE_KEY) {
    throw new Error("Missing environment variable: AIRTABLE_KEY")
  }

  const base = new Airtable({
    endpointUrl: AIRTABLE_ENDPOINT,
    apiKey: AIRTABLE_KEY,
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
    url: record.get("Link"),
    read_on: record.get("Read on"),
    rating: record.get("Scale"),
    kind: record.get("Kind"),
    topics: record.get("Topic"),
  }));
}

/**
 * Used during development so I don't have to have my AIRTABLE_KEY
 * around when I'm just developing.
 */
function mockRecords() {
  return [
    {
      title: "Inhumanity of Root Cause Analysis",
      url: "TODO",
      read_on: "TODO",
      rating: 4,
      kind: "blog",
      topics: ["incident-response", "sre", "resilience-engineering"],
    },
    { title: "Awesome limits", url: "TODO", read_on: "TODO", rating: 3 },
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
