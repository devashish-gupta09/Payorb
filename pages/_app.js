import { ThemeProvider } from '@material-ui/styles'
import theme from '../src/theme'
import '../styles/globals.css'
import AuthenticationContext, { Context } from '../src/components/AuthenticationContext'

function MyApp({ Component, pageProps }) {
  return <AuthenticationContext>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </AuthenticationContext>

}

export default MyApp
