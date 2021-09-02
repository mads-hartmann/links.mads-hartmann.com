import { JSDOM } from 'jsdom'
import { Fetch } from './fetch';
import { Item, RSSParser } from './rss';

export class NoRSSFeed extends Error {
    constructor(url: string) {
        super(`No RSS feed found for ${url}`)
    }
}

export type ScrapeOptions = {
    fetcher: Fetch
    parser: RSSParser
}

/**
 * Can scape a URL and find other links that might be interesting.
 * 
 * Currently based on RSS feeds.
 */
export class Scrape {

    constructor(private readonly options: ScrapeOptions) { }

    /**
     * 
     */
    private async findRSSFeedUrl(url: string): Promise<string> {
        const text = await this.options.fetcher.fetch(url)
        const dom = new JSDOM(text)
        const document = dom.window.document
        const links = document.querySelectorAll('link[type="application/rss+xml"]');

        if (links.length === 0) {
            throw new NoRSSFeed(url)
        }

        return links[0].getAttribute('href') as string
    }

    /**
     * Given a domain, find all the URLs that might be worth scraping based on
     * existing RSS/Atom feeds.
     * 
     * @param domain The domain to look for URLs at
     */
    public async findUrls(url: string): Promise<Array<Item>> {
        const feeUrl = await this.findRSSFeedUrl(url);
        const feed = await this.options.parser.parseURL(feeUrl)
        return feed.items
    }

}
