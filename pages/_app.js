import "../styles/globals.css";
import Router from "next/router";
import withGA from "next-ga";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

console.log('ga code', process.env.NEXT_PUBLIC_GA)

export default withGA(process.env.NEXT_PUBLIC_GA, Router)(MyApp);
