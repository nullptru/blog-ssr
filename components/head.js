import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/pure-min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/github.min.css" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js" />
    <script src="/static/live2d.min.js" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

Head.defaultProps = {
  title: '',
  description: '',
  url: '',
  ogImage: '',
};

export default Head;
