let api;

if (process.env.NODE_ENV === 'production') {
  api = 'http://geasscn.me:3000/';
} else {
  api = 'http://localhost:3001/';
}
export default {
  publicKey: 'geass_blog',
  api: {
    articles: {
      query: `${api}articles/page`,
      queryAll: `${api}articles/all`,
      querySingle: `${api}article/:id`,
      querySingleAdmin: `${api}article/admin/:id`,
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
