import styles from '../styles/Home.module.css'
import { fetchLinks } from '../lib/links'

export async function getStaticProps() {
  return {
    props: {
      links: await fetchLinks()
    }
  }
}

export default function Home({ links }) {
  return (
    <div className={styles.container}>
      <ul>
        {links.map(link => (
          <li>
            <a href={`/links/${link.id}`}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
