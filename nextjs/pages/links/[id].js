export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }
        ],
        fallback: false
    };
}

export async function getStaticProps() {
    return {
        props: {
            link: { id: '1', title: 'link 1' },
        }
    }
}

export default function Home({ link }) {
    return (
        <>
            <h1>{link.title}</h1>
        </>
    )
}
