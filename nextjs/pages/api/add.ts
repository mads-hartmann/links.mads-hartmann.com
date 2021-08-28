import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksDB } from '../../lib/links-db'
import fs from 'fs'

import fetch from 'node-fetch';
import { promisify } from 'util';

// curl -X POST --header "Content-Type: application/json" --data '{"url":"https://blog.mads-hartmann.com/sre/2021/05/14/thundering-herd.html"}' localhost:3000/api/add
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(req.body.url)
        res.status(200).json({
            title: 'what'
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
