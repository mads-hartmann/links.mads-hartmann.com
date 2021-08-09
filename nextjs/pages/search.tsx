import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

    const [query, setQuery] = useState("");
    const { data, error } = useSWR(`/api/search?title=${query}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div>
            <h1>Search</h1>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />

            {data.links.map(link => (
                <li key={link.id}>
                    <a href={`/links/${link.id}`}>
                        {link.title}
                    </a>
                </li>
            ))}
        </div>
    )
}
