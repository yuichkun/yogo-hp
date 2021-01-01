import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img className={styles.bg_image} src="/bg-image-1.png"></img>
        <img className={styles.bg_image} src="/bg-image-2.gif"></img>
        <img className={styles.bg_image} src="/bg-image-3.png"></img>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}