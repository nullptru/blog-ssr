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
      const queryParams = { id: req.params.id };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/tags/:tagId', (req, res) => {
      const actualPage = '/index';
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
        return handle(req, res, parsedUrl);
      }
    });

    server.listen(3001, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:3001`) // eslint-disable-line
    });
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line
    process.exit(1);
  });

