import styles from './SP.module.css'

const Background = () => (
  <div className={styles.bg_container}>
    <img className={styles.bg_image} src="/sp-bg-image.jpg"></img>
  </div>
);

export default function PC() {
  return (
    <div className={styles.container}>
      <Background />
      <main className={styles.main}>
        <h1 className={styles.title}>YOGO</h1>
        {/* <Description />
        <hr className={styles.separator} />
        <VideoArea /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}