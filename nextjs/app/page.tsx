import Link from 'next/link';

export default function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Klleon Chat SDK</h1>
            <div style={styles.linkContainer}>
                <Link href="/avatar/1" style={styles.linkButton}>
                    Avatar 1
                </Link>
                <Link href="/avatar/2" style={styles.linkButton}>
                    Avatar 2
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f8',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    linkContainer: {
        display: 'flex',
        gap: '15px',
    },
    linkButton: {
        padding: '10px 20px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0070f3',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    } as React.CSSProperties,
};
