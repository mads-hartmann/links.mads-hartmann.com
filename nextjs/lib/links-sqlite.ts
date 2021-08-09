import path from 'path'
import { Database } from 'sqlite3'

type Link = {
    id: string
    title: string
    topics: string[]
}

type Tag = string

function fromRow(row: any): Link {
    return ({
        id: row['Id'],
        title: row['Title'],
        topics: JSON.parse(row['Topic'])
    })
}

const db = new Database(
    path.join(
        process.cwd(),
        'data',
        'links.db'
    )
);

export async function getLink(id: string): Promise<Link> {
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
        db.get(query, id, (statement, row, error) => {
            if (error) {
                console.error(`failed to load link ${id}`, error)
                reject(error)
            } else {
                resolve(fromRow(row))
            }
        })
    });
}

export async function getLinks(): Promise<Link[]> {
    return new Promise((resolve, reject) => {
        const links: Link[] = []

        db.each(`
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
                links.push(fromRow(row))
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

export async function getTags(): Promise<Tag[]> {
    return new Promise((resolve, reject) => {
        const tags: Tag[] = []

        const query = `
            SELECT DISTINCT(json_each.value) as tag from Links, json_each(Links.Topic);
        `

        db.each(query,
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

export async function getLinksWithTag(tag: string): Promise<Link[]> {

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

        db.each(query, tag,
            (error, row) => {
                if (error) {
                    reject(error)
                }
                links.push(fromRow(row))
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

export async function searchTitle(token: string): Promise<{ title: string, id: string }[]> {
    return new Promise((resolve, reject) => {
        const titles: { title: string, id: string }[] = []

        const query = `
            SELECT Title, airtable_id FROM Links_fts where Title MATCH ?
        `

        console.log(`Searching for title matching: ${token}`)

        db.each(query, token,
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
