import { ThemeProvider } from "@material-ui/styles";
import dynamic from "next/dynamic";
import Head from "next/head";

import AuthenticationContextProvider from "../src/components/AuthenticationContext";
import theme from "../src/theme";
import "../styles/globals.css";

const CrispWithNoSSR = dynamic(() => import("../src/components/Crisp"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
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
