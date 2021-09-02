import fetch from 'node-fetch'

export interface Fetch {
    fetch(url: string): Promise<string>
}

export class NodeFetch implements Fetch {
    constructor() { }
    async fetch(url: string): Promise<string> {
        const response = await fetch(url)
        const text = await response.text()
        return text
    }
}
