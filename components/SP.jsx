import styles from './SP.module.css'

export default function PC() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img className={styles.bg_image} src="/sp-bg-image.jpg"></img>
      </main>
    </div>
  )
}