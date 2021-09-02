export type Item = {
    title: string
    link: string
}

export type Feed = {
    items: Item[]
}

export interface RSSParser {
    parseURL(url: string): Promise<Feed>
}
