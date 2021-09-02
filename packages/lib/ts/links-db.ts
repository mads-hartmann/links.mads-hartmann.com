import path from 'path'
import { Database } from 'sqlite3'

export type Link = {
    id: string
    title: string
    topics: string[]
}

type Tag = string

export type LinksDBOptions = {
    // Absolute path to the SQLite database to use
    dbPath: string
}

export class LinksDB {
    private db: Database

    constructor(private readonly options: LinksDBOptions) {
        this.db = new Database(options.dbPath)
    }

    public async getLink(id: string): Promise<Link> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT
                    airtable_id as Id,
                    Title,
                    Topic,
                    Link
                FROM Links
                WHERE airtable_id = ?
            `
            this.db.get(query, id, (statement: any, row: any, error: Error) => {
                if (error) {
                    console.error(`failed to load link ${id}`, error)
                    reject(error)
                } else {
                    resolve(this.fromRow(row))
                }
            })
        });
    }

    public async getLinks(): Promise<Link[]> {
        return new Promise((resolve, reject) => {
            const links: Link[] = []

            this.db.each(`
                SELECT 
                    airtable_id as Id,
                    Title,
                    Topic,
                    Link
                FROM Links
                ORDER BY airtable_createdTime DESC
            `,
                (error, row) => {
                    if (error) {
                        reject(error)
                    }
                    links.push(this.fromRow(row))
                },
                (error, count) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(links)
                    }
                });
        })
    }

    public async getTags(): Promise<Tag[]> {
        return new Promise((resolve, reject) => {
            const tags: Tag[] = []

            const query = `
                SELECT 
                    DISTINCT(json_each.value) as tag,
                    COUNT(*) as count
                FROM Links, json_each(Links.Topic)
                GROUP BY tag
                ORDER BY count DESC;
            `

            this.db.each(query,
                (error, row) => {
                    if (error) {
                        reject(error)
                    }
                    tags.push(row['tag'])
                },
                (error, count) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(tags)
                    }
                });
        })
    }

    public async getLinksWithTag(tag: string): Promise<Link[]> {

        return new Promise((resolve, reject) => {
            const links: Link[] = []

            const query = `
                SELECT 
                    airtable_id as Id,
                    Title,
                    Topic,
                    Link
                FROM 
                    Links,
                    json_each(Links.Topic)
                WHERE 
                    json_each.value = ?
            `

            this.db.each(query, tag,
                (error, row) => {
                    if (error) {
                        reject(error)
                    }
                    links.push(this.fromRow(row))
                },
                (error, count) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(links)
                    }
                });
        })
    }

    public async searchTitle(token: string): Promise<{ title: string, id: string }[]> {
        return new Promise((resolve, reject) => {
            const titles: { title: string, id: string }[] = []

            const query = `
                SELECT Title, airtable_id FROM Links_fts where Title MATCH ?
            `

            console.log(`Searching for title matching: ${token}`)

            this.db.each(query, token,
                (error, row) => {
                    if (error) {
                        reject(error)
                    } else {
                        titles.push({
                            title: row['Title'],
                            id: row['airtable_id'],
                        })
                    }
                },
                (error, count) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(titles)
                    }
                });
        })
    }

    public async getDistinctDomains(): Promise<{ domain: string, count: number }[]> {
        return new Promise((resolve, reject) => {
            const domains: { domain: string, count: number }[] = []

            const query = `
                SELECT 
                    SUBSTR(SUBSTR(Link, INSTR(Link, '//') + 2), 0, INSTR(SUBSTR(Link, INSTR(Link, '//') + 2), '/')) as domain,
                    COUNT(*) as count
                FROM Links
                GROUP BY domain
                ORDER BY count DESC
            `

            this.db.each(query,
                (error, row) => {
                    if (error) {
                        reject(error)
                    } else {
                        domains.push({
                            domain: row['domain'],
                            count: row['count'],
                        })
                    }
                },
                (error, count) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(domains)
                    }
                });
        })
    }

    private fromRow(row: any): Link {
        return ({
            id: row['Id'],
            title: row['Title'],
            topics: JSON.parse(row['Topic']) || []
        })
    }

}


