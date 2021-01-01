import styles from "./SP.module.css";

const Background = () => (
  <div className={styles.bg_container}>
    <img className={styles.bg_image} src="/sp-bg-image.jpg"></img>
  </div>
);

const Description = () => (
  <p className={styles.description}>
    音楽家。
    <br />
    東京藝術大学作曲科卒業。 <br />
    茨木のり子。
  </p>
);

const VideoArea = () => (
  <div className={styles.video_container}>
    <video
      className={styles.quantization}
      src="https://s3-ap-northeast-1.amazonaws.com/yogo.style/quantization-excerpt.mp4"
      controls
      controlsList="nodownload"
    />
    <h3 className={styles.video_caption}>Quantization (excerpt)</h3>
  </div>
);

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://note.com/yuichi_yogo" target="_blank">
      <img src="note.png" alt="note-icon" />
    </a>
    <a href="https://twitter.com/yogo_yuichi" target="_blank">
      <img src="twitter.png" alt="twitter-icon" />
    </a>
    <a
      href="https://www.youtube.com/channel/UCcRqttKMJr2axi6nuDt7qCg"
      target="_blank"
    >
      <img src="youtube.png" alt="youtube-icon" />
    </a>
  </footer>
);

export default function SP() {
  return (
    <div className={styles.container}>
      <Background />
      <main className={styles.main}>
        <h1 className={styles.title}>YOGO</h1>
        <Description />
        <VideoArea />
      </main>
      <Footer />
    </div>
  );
}
