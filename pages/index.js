import Head from 'next/head'
import PC from '../components/PC'

export default function Home() {
  return (
    <>
      <Head>
        <title>YOGO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PC />
    </>
  )
}
