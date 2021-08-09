// SELECT * FROM Links_fts where Title MATCH '50ms';

import type { NextApiRequest, NextApiResponse } from 'next'
import { searchTitle } from '../../lib/links-sqlite'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const title = req.query.title;

    const links = !title ? [] : await searchTitle(req.query.title as string)

    res.status(200).json({
        query: req.query.title,
        links: links
    })
}
