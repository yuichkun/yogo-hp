import styles from "./PC.module.css";

export default function PC() {
  return (
    <div className={styles.container}>
      <div className={styles.bg_container}>
        <img className={styles.bg_image} src="/bg-image-1.png"></img>
        <img className={styles.bg_image} src="/bg-image-2.gif"></img>
        <img className={styles.bg_image} src="/bg-image-3.png"></img>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>YOGO</h1>
        <p className={styles.description}>
          音楽家。
          <br />
          東京藝術大学作曲科卒業。 <br />
          茨木のり子。
        </p>
        <hr />
        <video
          className={styles.quantization}
          src="https://s3-ap-northeast-1.amazonaws.com/yogo.style/quantization-excerpt.mp4"
          controls
          controlsList="nodownload"
        ></video>
        <h3 className={styles.video_caption}>Quantization (excerpt)</h3>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
