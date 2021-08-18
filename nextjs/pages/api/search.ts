import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksDB } from '../../lib/links-db'
import fs from 'fs'

import fetch from 'node-fetch';
import { promisify } from 'util';
const writeFilePromise = promisify(fs.writeFile);

function downloadFile(url: string, outputPath: string) {
    return fetch(url)
        .then(x => x.arrayBuffer())
        .then(x => writeFilePromise(outputPath, Buffer.from(x)));
}

async function download(uri: string, filename: string) {

    if (fs.existsSync(filename)) {
        console.log('File already exists.')
        return
    }

    try {
        console.log('Downloading file')
        await downloadFile(uri, '/tmp/links.db');
        console.log('All done');
    } catch (error) {
        console.log('Download failed', error)
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const url = process.env.GITPOD_WORKSPACE_URL
        ? process.env.GITPOD_WORKSPACE_URL.replace('https://', 'https://3000-')
        : `https://${process.env.VERCEL_URL}`

    await download(`${url}/data/links.db`, "/tmp/links.db")

    const db = new LinksDB({
        dbPath: "/tmp/links.db"
    })

    const title = req.query.title;

    const links = !title ? [] : await db.searchTitle(req.query.title as string)

    res.status(200).json({
        query: req.query.title,
        links: links
    })
}
