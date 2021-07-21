import { ThemeProvider } from "@material-ui/styles";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import AuthenticationContextProvider from "../src/components/AuthenticationContext";
import theme from "../src/theme";
import { pageview } from "../src/utils/ga";
import "../styles/globals.css";

const CrispWithNoSSR = dynamic(() => import("../src/components/Crisp"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { referral } = router.query;

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url, { referral });
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Payorb</title>
      </Head>
      <AuthenticationContextProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CrispWithNoSSR />
        </ThemeProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default MyApp;
