import { Client } from "@notionhq/client"

const NOTION_DATABASE_ID = 'bfcfd0bbfc2e4c18a315cc9be3665019'
const NOTION_KEY = process.env.NOTION_KEY

export type Link = {
    id: string
    title: string
    topics: string[],
    url: string,
    addedOn: string,
    readOn: string
}

type Tag = string

export class LinksNotion {
    private client: Client

    constructor() {
        this.client = new Client({ auth: NOTION_KEY })
    }

    public async getLink(id: string): Promise<Link> {
        const response = await this.client.pages.retrieve({ page_id: id })
        return this.fromResults([response])[0]
    }

    public async getLinks(): Promise<Link[]> {
        // TODO: Fetch the remaining pages
        const response = await this.client.databases.query({
            database_id: NOTION_DATABASE_ID,
            page_size: 1000
        });
        return this.fromResults(response.results)
    }

    public async getTags(): Promise<Tag[]> {
        const response = await this.client.databases.retrieve({
            database_id: NOTION_DATABASE_ID
        })
        const topic: any = response.properties.Topic
        return topic.multi_select.options.map((option: any) => option.name)
    }

    public async getLinksWithTag(tag: string): Promise<Link[]> {
        const response = await this.client.databases.query({
            database_id: NOTION_DATABASE_ID,
            filter: {
                property: 'Topic',
                multi_select: {
                    contains: tag,
                },
            }
        });
        return this.fromResults(response.results)
    }

    public async searchTitle(token: string): Promise<{ title: string, id: string }[]> {
        // TODO
        return []
    }

    public async getDistinctDomains(): Promise<{ domain: string, count: number }[]> {
        // TODO
        return []
    }

    private fromResults(resulsts: any[]): Link[] {
        return resulsts.map((result) => {
            const readOn = result.properties['Read on']?.date?.start || null
            const addedOn = result.properties['Added at']?.date?.start || null
            const topics = result.properties.Topic.multi_select || []
            return ({
                id: result.id,
                title: result.properties.Title.title[0].plain_text,
                topics: topics.map((t: any) => t.name),
                url: result.properties.Link.url,
                addedOn: addedOn,
                readOn: readOn
            })
        })
    }

}


