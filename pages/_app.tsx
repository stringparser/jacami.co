import App, { AppContext, AppInitialProps, AppProps } from "next/app";

import "./app.module.css";
import config from "../config";

import { bounds } from "../shared/components/styles";
import { getMeta } from "../shared/util";

import Navigation from "../shared/components/Navigation/Navigation";
import DocumentHead from "../shared/components/Document/Head";

export async function getStaticProps({ Component, router, ctx }: AppContext) {
  const pageProps = typeof window === 'undefined' && Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}
  ;

  const meta = getMeta(router.route);

  return {
    props: {
      ...config.defaults,
      ...pageProps,
      ...meta,
      seo: {
        ...meta.seo,
        ...config.seo,
      },
    }
  };
}

const WebApp: React.FC<AppProps> = ({
  Component,
  pageProps
}) => (
  <>
    <DocumentHead {...config.defaults} />
    <Navigation />
    <main>
      <Component {...pageProps} />
    </main>
    <style jsx>{`
      main {
        margin: 0 auto;
        padding: 1rem;
        max-width: ${bounds.maxWidth};
      }
    `}</style>
  </>
);

export default WebApp;