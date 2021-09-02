import path from 'path'
import { LinksDB } from '@links/lib/links-db'
import Link from 'next/link'

export async function getStaticProps() {
  const db = new LinksDB({
    dbPath: path.join(
      process.cwd(),
      'public',
      'data',
      'links.db'
    )
  });
  return {
    props: {
      links: await db.getLinks()
    }
  }
}

export default function Home({ links }) {
  return (
    <div>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <Link href={`/links/${link.id}`}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
