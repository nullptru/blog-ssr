let api;

if (process.env.NODE_ENV === 'production') {
  api = 'http://localhost:3000/';
} else {
  api = 'http://localhost:3000/';
}
export default {
  publicKey: 'geass_blog',
  api: {
    articles: {
      query: `${api}articles/page`,
      querySingle: `${api}article/:id`,
      queryLatest: `${api}articles/latest`,
      queryByTag: `${api}articles/tags/:tag/page`,
      queryTagsArticles: `${api}articles/tags`,
    },
    tags: {
      query: `${api}tags/page`,
    },
    comments: {
      query: `${api}comments/article/:id`,
      create: `${api}comment/article/:id`,
    },
    errors: {
      create: `${api}error`,
    },
  },
};
