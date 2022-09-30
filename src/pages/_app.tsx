import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout/Layout"
import VersionListProvider from "../store/VersionContext/VersionList";
import ChampionListProvider from "../store/ChampionContext/ChampionList";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <VersionListProvider>
          <ChampionListProvider>
              <Layout>
                  <Component {...pageProps}/>
              </Layout>
          </ChampionListProvider>
      </VersionListProvider>
  )
}

export default MyApp
