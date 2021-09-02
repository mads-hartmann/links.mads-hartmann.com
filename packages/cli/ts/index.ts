import { LinksDB } from '@links/lib/links-db'
import path from 'path'
import Parser from 'rss-parser';
import { NodeFetch } from '@links/lib/fetch';
import { Scrape, NoRSSFeed } from '@links/lib/scrape';

const dbPath = path.join(
    process.env.GITPOD_REPO_ROOT as string,
    'packages',
    'web',
    'public',
    'data',
    'links.db'
)
console.log(dbPath)
const db = new LinksDB({
    dbPath: dbPath
});

const scrape = new Scrape({
    fetcher: new NodeFetch(),
    parser: new Parser()
})

async function main() {
    const domains = await db.getDistinctDomains()
    domains.slice(0, 5).forEach(async (domain) => {
        const url = `https://${domain.domain}`
        console.log(`Scraping ${url}`)
        try {
            const urls = await scrape.findUrls(url)
            console.log(`Found ${urls.length} items`)
        } catch (e) {
            if (e instanceof NoRSSFeed) {
                console.log(e.message)
            } else {
                console.error('Unknown error', e)
            }
        }
    })
}

main()
