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
    const onClick = () => {
      videoRef.current.play();
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
      else if (videoRef.current.webkitRequestFullscreen) videoRef.current.webkitRequestFullscreen();
      else if (videoRef.current.msRequestFullScreen) videoRef.current.msRequestFullScreen();
    };
    playButtonRef.current.addEventListener("click", onClick);
    return () => playButtonRef.current.removeEventListener("click", onClick);
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

const Footer = () => <footer className={styles.footer}></footer>;

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
