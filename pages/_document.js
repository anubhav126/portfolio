import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class Document extends React.Component {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Explore my portfolio showcasing innovative projects and creative work in the metaverse and web development space." />
          <meta name="keywords" content="portfolio, metaverse, web development, creative projects" />
          <meta property="og:title" content="My Portfolio - Metaverse & Web Development" />
          <meta property="og:description" content="Explore my portfolio showcasing innovative projects and creative work in the metaverse and web development space." />
          <meta property="og:type" content="website" />
          <title>A portfolio website showcasing my work</title>
          <link
            href="https://stijndv.com/fonts/Eudoxus-Sans.css"
            rel="stylesheet"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;