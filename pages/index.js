import Head from 'next/head'
import PC from '../components/PC'
import SP from '../components/SP'
import {useMediaLayout} from 'use-media';

const MEDIA_BREAK_POINT = 850;

export default function Home() {
  const isWide = useMediaLayout({minWidth: `${MEDIA_BREAK_POINT}px`});
  return (
    <>
      <Head>
        <title>OGO</title>
        <meta property="og:title" content="YOGO" />
        <meta property="og:site_name" content="YOGO" />
        <meta property="og:description" content="音楽家。東京藝術大学作曲科卒業。茨木のり子。" />
        <meta property="og:image" content="https://s3-ap-northeast-1.amazonaws.com/yogo.style/yogo_ogp.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/bg-image-1.png" as="image" media={`(min-width: ${MEDIA_BREAK_POINT}px)`} />
        <link rel="preload" href="/bg-image-2.gif" as="image" media={`(min-width: ${MEDIA_BREAK_POINT}px)`} />
        <link rel="preload" href="/bg-image-3.png" as="image" media={`(min-width: ${MEDIA_BREAK_POINT}px)`} />
        <link rel="preload" href="/sp-bg-image.jpg" as="image" media={`(max-width: ${MEDIA_BREAK_POINT}px)`} />
      </Head>
      {isWide ? <PC /> : <SP />}
    </>
  )
}
