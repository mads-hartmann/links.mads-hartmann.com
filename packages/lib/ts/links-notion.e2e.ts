import { expect } from 'chai'
import Parser from 'rss-parser';
import { LinksNotion } from './links-notion';

describe('Links Notion', () => {

    it('Should be able to fetch links', async () => {
        const linksNotion = new LinksNotion()
        const items = await linksNotion.getLinks()
        expect(items.length).to.be.greaterThan(0)
    });

    it('should fetch a page by id', async () => {
        const linksNotion = new LinksNotion()
        const item = await linksNotion.getLink('56760e25-f799-446c-9a2a-6228fda16914')
        expect(item.title).to.be.eq('Proof of Work vs. Proof of Stake: the Ecological Footprint')
    });

    it.only('should list all tags', async () => {
        const linksNotion = new LinksNotion()
        const tags = await linksNotion.getTags()
        expect(tags.length).to.be.greaterThan(0)
    });

})
