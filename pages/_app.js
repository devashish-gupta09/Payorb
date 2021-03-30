import { ThemeProvider } from '@material-ui/styles'
import theme from '../src/theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
