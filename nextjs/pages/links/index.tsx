import { getLinks } from '../../lib/links-sqlite'
import Link from 'next/link'

export async function getStaticProps() {
  return {
    props: {
      links: await getLinks()
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
