let api;

if (process.env.NODE_ENV === 'production') {
  api = 'http://geasscn.me:3000/';
} else {
  api = '/api/v1';
}
export default {
  publicKey: 'geass_blog',
  api: {
    articles: {
      upload: `${api}article/image/upload`,
      create: `${api}article`,
      delete: `${api}article/:id`,
      update: `${api}article`,
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
      create: `${api}tag`,
      delete: `${api}tag/:id`,
      update: `${api}tag`,
    },
    login: {
      login: `${api}login`,
      loginStatus: `${api}login/status`,
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
