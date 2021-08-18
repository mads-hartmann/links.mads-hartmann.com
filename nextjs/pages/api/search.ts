import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksDB } from '../../lib/links-db'
import fs from 'fs'
import Downloader from 'nodejs-file-downloader';

async function download(uri: string, filename: string) {

    if (fs.existsSync(filename)) {
        console.log('File already exists.')
        return
    }

    console.log('Downloading file')

    const downloader = new Downloader({
        url: uri,
        directory: "/tmp",
        fileName: 'links.db'
    })

    try {
        await downloader.download();//Downloader.download() returns a promise.
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
