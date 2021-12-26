import { expect } from 'chai'
import Parser from 'rss-parser';
import { LinksNotion } from './links-notion';

describe('Links Notion', () => {

    it.only('Should be able to fetch links', async () => {
        const linksNotion = new LinksNotion()
        const items = await linksNotion.getLinks()
        console.log(items)
        expect(items.length).to.be.greaterThan(0)
    });

})
