import Airtable from 'airtable'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_KEY = process.env.AIRTABLE_KEY;
const AIRTABLE_ENDPOINT = "https://api.airtable.com";

/**
 * Loads all links from my Airtable database.
 */
export async function fetchLinks() {

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
        id: record.id,
        title: record.get("Title"),
        url: record.get("Link"),
        read_on: record.get("Read on") || null,
        rating: record.get("Scale") || null,
        kind: record.get("Kind") || 'unknown',
        topics: record.get("Topic") || [],
    }));
}

export async function fetchLink(id) {
    const base = new Airtable({
        endpointUrl: AIRTABLE_ENDPOINT,
        apiKey: AIRTABLE_KEY,
    }).base(AIRTABLE_BASE_ID);
    return new Promise((resolve, reject) => {
        base('Links').find(id, function (err, record) {
            if (err) {
                reject(err)
            }
            resolve({
                id: record.id,
                title: record.get("Title") || 'unknown',
                url: record.get("Link") || 'unknown',
                read_on: record.get("Read on") || null,
                rating: record.get("Scale") || null,
                kind: record.get("Kind") || 'unknown',
                topics: record.get("Topic") || [],
            })
        });
    })

}
