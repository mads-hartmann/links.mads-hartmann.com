import { expect } from 'chai'
import { NoRSSFeed, Scrape, ScrapeOptions } from './scrape'
import fs from 'fs'
import path from 'path'
import Sinon from 'sinon';

describe('Scrape', () => {

    const fixturePath = ['ts', 'test', 'fixtures', 'scrape']
    const pageWithRSSFeed: string = fs.readFileSync(path.join(...fixturePath, 'page-with-rss-feed.html')).toString('utf8')
    const pageWithMultipleRSSFeeds: string = fs.readFileSync(path.join(...fixturePath, 'page-with-multiple-rss-feeds.html')).toString('utf8')
    const pageWithoutRSSFeed: string = fs.readFileSync(path.join(...fixturePath, 'page-without-rss-feed.html')).toString('utf8')

    describe('findUrls', () => {

        it('Should detect the RSS feed associated with a URL and parse the feed', async () => {
            const feed = { items: [{ title: 'Item 1', link: 'https://foobar.com' }] }
            const fetchFake = Sinon.fake.resolves(pageWithRSSFeed)
            const parseURLFake = Sinon.fake.resolves(feed)

            const options: ScrapeOptions = {
                fetcher: {
                    fetch: fetchFake
                },
                parser: {
                    parseURL: parseURLFake
                }
            }

            const scrape = new Scrape(options)
            const urls = await scrape.findUrls('https://foobar.com')

            expect(fetchFake.calledOnceWith('https://foobar.com'))
            expect(parseURLFake.calledOnceWith('https://foobar.com/feed.xml'))
            expect(urls).to.eql(feed.items);
        });

        it('should use the first link with type="application/rss+xml" in case of multiple feeds', async () => {
            const feed = { items: [] }
            const fetchFake = Sinon.fake.resolves(pageWithMultipleRSSFeeds)
            const parseURLFake = Sinon.fake.resolves(feed)

            const options: ScrapeOptions = {
                fetcher: {
                    fetch: fetchFake
                },
                parser: {
                    parseURL: parseURLFake
                }
            }

            const scrape = new Scrape(options)
            const urls = await scrape.findUrls('https://foobar.com')

            expect(fetchFake.calledOnceWith('https://foobar.com'))
            expect(parseURLFake.calledOnceWith('https://foobar.com/feed-one.xml'))
            expect(urls).to.eql(feed.items);
        })

        it('Should throw an NoRSSFeed error when no feed is available', async () => {
            const options: ScrapeOptions = {
                fetcher: {
                    fetch: Sinon.fake.resolves(pageWithoutRSSFeed)
                },
                parser: {
                    parseURL: Sinon.fake.resolves([])
                }
            }
            const scrape = new Scrape(options)
            const url = 'https://foobar.com'
            return expect(scrape.findUrls(url)).to.eventually.be.rejectedWith(new NoRSSFeed(url).message)
        })
    });

});
