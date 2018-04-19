// ./pages/_document.js
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="/static/iconfont.css" />
          <link rel="stylesheet" href="/static/iconfont.css" />
          <link rel="stylesheet" href="/static/nprogress.css" />
          {/* Add to home screen for Safari on iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="Geass Blog" />
          <link rel="apple-touch-icon" href="/static/favicon.ico" />

          <meta name="msapplication-TileImage" content="/static/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2F3BA2" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
