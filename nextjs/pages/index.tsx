import styles from '../styles/Home.module.css'

export default function Home({ tags }) {
    return (
        <div className={styles.container}>
            <h1>links.mads-hartmann.com</h1>
            <ul>
                <li><a href="/tags">All tags</a></li>
                <li><a href="/links">All links</a></li>
            </ul>
        </div>
    )
}
