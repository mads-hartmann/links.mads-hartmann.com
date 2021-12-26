import { expect } from 'chai'
import Parser from 'rss-parser';
import { NodeFetch } from './fetch';
import { Scrape } from './scrape'

describe('Scrape E2E', () => {

    it('should successfully parse blog.mads-hartmann.com', async () => {
        const scrape = new Scrape({
            fetcher: new NodeFetch(),
            parser: new Parser()
        })
        const items = await scrape.findUrls('https://blog.mads-hartmann.com/')

        expect(items.length).to.be.greaterThan(0)
        expect(items.map(i => i.title)).to.contain('Thundering herds, noisy neighbours, and retry storms')
    });

})
