import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksDB } from '@links/lib/links-db'
import { download } from '@links/lib/download-db'

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
