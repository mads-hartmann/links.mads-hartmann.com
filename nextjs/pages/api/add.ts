import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import Airtable from 'airtable'



async function fetchText(url: string): Promise<Document> {
    const response = await fetch(url)
    const text = await response.text()
    return new JSDOM(text).window.document
}

type Record = {
    title: string
    topics?: string[]
    kind: string
    link: string
}

async function createAirtableRecord(record: Record): Promise<string> {
    var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID);
    const payload = {
        "fields": {
            "Title": record.title,
            "Topic": record.topics,
            "Kind": record.kind,
            "Link": record.link
        }
    }
    return new Promise((resolve, reject) => {
        base('Links').create([payload], (err, records) => {
            if (err) {
                console.error(err);
                return reject(err)
            }
            const id = records[0].getId()
            resolve(id)
        });
    });
}

// curl -X POST --header "Content-Type: application/json" --data '{"url":"https://blog.mads-hartmann.com/sre/2021/05/14/thundering-herd.html"}' localhost:3000/api/add
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const url = req.body.url
        const document = await fetchText(url)
        const title = document.querySelector('title').text
        const airtableID = await createAirtableRecord({
            title: title,
            link: url,
            kind: 'unknown'
        })
        res.status(200).json({
            title: title,
            url: url,
            airtableID: airtableID
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
