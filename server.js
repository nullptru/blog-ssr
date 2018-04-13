const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (/[^.]*\.(js|css)$/.test(pathname)) {
        const realPathname = pathname
          .replace(/_next\/static/, 'static')
          .replace(/_next\/[^/]*\//, '')
          .replace('page', 'bundles/pages');
        const filePath = join(__dirname, 'build', realPathname);
        app.serveStatic(req, res, filePath);
      } else {
        console.log(req.url); // eslint-disable-line
        handle(req, res, parsedUrl);
      }
    })
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);  // eslint-disable-line
      });
  });
