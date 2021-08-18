import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksDB } from '../../lib/links-db'
import fs from 'fs'
import { $ } from 'zx'

// I don't want to see the shell commands in my stdout
// set to true to debug.
$.verbose = false

async function download(uri: string, filename: string) {

    if (fs.existsSync(filename)) {
        console.log('File already exists.')
        return
    }

    console.log('Downloading file')

    try {
        await $`curl -o ${filename} ${uri} > /dev/null`
    } catch (p) {
        console.log(`Exit code: ${p.exitCode}`)
        console.log(`Error: ${p.stderr}`)
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