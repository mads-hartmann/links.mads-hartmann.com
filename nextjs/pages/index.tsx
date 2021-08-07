import styles from '../styles/Home.module.css'
import { getLinks } from '../lib/links-sqlite'

export async function getStaticProps() {
  return {
    props: {
      links: await getLinks()
    }
  }
}

export default function Home({ links }) {
  return (
    <div className={styles.container}>
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
