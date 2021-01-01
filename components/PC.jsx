import { useEffect, useRef } from "react";
import styles from "./PC.module.css";

const Background = () => (
  <div className={styles.bg_container}>
    <img className={styles.bg_image} src="/bg-image-1.png"></img>
    <img className={styles.bg_image} src="/bg-image-2.gif"></img>
    <img className={styles.bg_image} src="/bg-image-3.png"></img>
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

const VideoArea = () => {
  const videoRef = useRef();
  const playButtonRef = useRef();
  useEffect(() => {
    const video = videoRef.current;
    const playButton = playButtonRef.current;
    if (video && playButton) {
      const onClick = () => {
        video.play();
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
        else if (video.msRequestFullScreen) video.msRequestFullScreen();
      };
      playButton.addEventListener("click", onClick);
      return () => playButton.removeEventListener("click", onClick);
    }
  }, []);
  return (
    <div className={styles.video_area}>
      <div className={styles.video_container}>
        <video
          ref={videoRef}
          className={styles.quantization}
          src="https://s3-ap-northeast-1.amazonaws.com/yogo.style/quantization-excerpt.mp4"
          controls
          controlsList="nodownload"
        />
        <h3 className={styles.video_caption}>Quantization (excerpt)</h3>
      </div>
      <div className={styles.play_button_container}>
        <img ref={playButtonRef} src="play-button.svg" alt="play-button" />
      </div>
    </div>
  );
};

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

export default function PC() {
  return (
    <div className={styles.container}>
      <Background />
      <main className={styles.main}>
        <h1 className={styles.title}>YOGO</h1>
        <Description />
        <hr className={styles.separator} />
        <VideoArea />
      </main>
      <Footer />
    </div>
  );
}
