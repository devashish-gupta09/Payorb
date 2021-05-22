import { ThemeProvider } from "@material-ui/styles";
import Head from "next/head";

import theme from "../src/theme";
import "../styles/globals.css";
import AuthenticationContext from "../src/components/AuthenticationContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Payorb</title>
      </Head>
      <AuthenticationContext>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthenticationContext>
    </>
  );
}

export default MyApp;
