import styles from '../styles/Home.module.css'
import Airtable from 'airtable'

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
    id: record.id,
    title: record.get("Title"),
    url: record.get("Link"),
    read_on: record.get("Read on") || null,
    rating: record.get("Scale") || null,
    kind: record.get("Kind") || 'unknown',
    topics: record.get("Topic") || [],
  }));
}


export async function getStaticProps() {
  return {
    props: {
      links: await airtableRecords()
    }
  }
}

export default function Home({ links }) {
  return (
    <div className={styles.container}>
      <ul>
        {links.map(link => (
          <li>
            <a href={`/links/${link.id}`}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
