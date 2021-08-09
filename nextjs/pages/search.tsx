import useSWR from 'swr'
import { useState } from 'react'
import Link from 'next/link'

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
                    <Link href={`/links/${link.id}`}>
                        {link.title}
                    </Link>
                </li>
            ))}
        </div>
    )
}
