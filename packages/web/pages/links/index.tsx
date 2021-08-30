import { LinksDB } from '@links/lib/links-db'
import Link from 'next/link'

export async function getStaticProps() {
  return {
    props: {
      links: await LinksDB.fromGitRepository().getLinks()
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
