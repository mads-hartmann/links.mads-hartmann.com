import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({ tags }) {
    return (
        <div className={styles.container}>
            <h1>links.mads-hartmann.com</h1>
            <ul>
                <li><Link href="/tags">All tags</Link></li>
                <li><Link href="/links">All links</Link></li>
                <li><Link href="/search">Search</Link></li>
                <li><Link href="/explore">Explore</Link></li>
            </ul>
        </div>
    )
}
