import Head from 'next/head'
import PC from '../components/PC'
import SP from '../components/SP'
import {useMediaLayout} from 'use-media';

export default function Home() {
  const isWide = useMediaLayout({minWidth: '850px'});
  return (
    <>
      <Head>
        <title>OGO</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/bg-image-1.png" as="image" />
        <link rel="preload" href="/bg-image-2.gif" as="image" />
        <link rel="preload" href="/bg-image-3.png" as="image" />
        <link rel="preload" href="/sp-bg-image.jpg" as="image" />
      </Head>
      {isWide ? <PC /> : <SP />}
    </>
  )
}
