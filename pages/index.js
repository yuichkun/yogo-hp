import Head from 'next/head'
import PC from '../components/PC'
import SP from '../components/SP'
import {useMediaLayout} from 'use-media';

export default function Home() {
  const isWide = useMediaLayout({minWidth: '770px'});
  return (
    <>
      <Head>
        <title>YOGO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isWide ? <PC /> : <SP />}
    </>
  )
}
