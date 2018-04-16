const { join } = require('path');
const { parse } = require('url');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/article/:id', (req, res) => {
      const actualPage = '/articleDetail';
      console.log(req.params, req.body, req.query);
      const queryParams = { id: req.params.id };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/tags/:tagId', (req, res) => {
      const actualPage = '/index';
      console.log(req.params, req.body, req.query);
      const queryParams = { tagId: req.params.tagId.split('?')[0], ...req.query };
      return app.render(req, res, actualPage, queryParams);
    });


    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (/^(?!\/static).*\.(js|css)$/.test(pathname)) {
        const realPathname = pathname
          .replace(/_next\/static/, 'static')
          .replace(/_next\/[^/]*\//, '')
          .replace('page', 'bundles/pages');
        const filePath = join(__dirname, 'build', realPathname);
        return app.serveStatic(req, res, filePath);
      } else {
        // console.log(req.url); // eslint-disable-line
        return handle(req, res, parsedUrl);
      }
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:3000`)
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

