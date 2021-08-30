import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksDB } from '@links/lib/links-db'
import { download } from '@links/lib/download-db'

// curl -X GET localhost:3000/api/topics
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const url = process.env.GITPOD_WORKSPACE_URL
        ? process.env.GITPOD_WORKSPACE_URL.replace('https://', 'https://3000-')
        : `https://${process.env.VERCEL_URL}`

    await download(`${url}/data/links.db`, "/tmp/links.db")

    const db = new LinksDB({
        dbPath: "/tmp/links.db"
    })

    const topics = await db.getTags()

    res.status(200).json({
        topics: topics
    })

}
