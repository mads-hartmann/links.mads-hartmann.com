import { getLinks } from '../../lib/links-sqlite'

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
            <a href={`/links/${link.id}`}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
