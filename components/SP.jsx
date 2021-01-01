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

export default function PC() {
  return (
    <div className={styles.container}>
      <Background />
      <main className={styles.main}>
        <h1 className={styles.title}>YOGO</h1>
        <Description />
        <VideoArea />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
