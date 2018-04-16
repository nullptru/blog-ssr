// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');

// const port = parseInt(process.env.PORT, 10) || 8000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare()
//   .then(() => {
//     createServer((req, res) => {
//       const parsedUrl = parse(req.url, true);
//       const { pathname } = parsedUrl;

//       if (/[^.]*\.(js|css)$/.test(pathname)) {
//         const realPathname = pathname
//           .replace(/_next\/static/, 'static')
//           .replace(/_next\/[^/]*\//, '')
//           .replace('page', 'bundles/pages');
//         const filePath = join(__dirname, 'build', realPathname);
//         app.serveStatic(req, res, filePath);
//       } else {
//         console.log(req.url); // eslint-disable-line
//         handle(req, res, parsedUrl);
//       }
//     }).listen(port, (err) => {
//       if (err) throw err;
//       console.log(`> Ready on http://localhost:${port}`);  // eslint-disable-line
//     });
//   });
// import Koa from 'koa';
// import next from 'next';
// import Router from 'koa-router';
// import { join } from 'path';
// import { parse } from 'url';

const { join } = require('path');
const { parse } = require('url');
const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();

    router.get('/article/:id', async (ctx) => {
      const actualPage = '/articleDetail';
      const queryParams = { id: ctx.params.id };
      await app.render(ctx.req, ctx.res, actualPage, queryParams);
    });

    router.get('*', async (ctx) => {
      const parsedUrl = parse(ctx.req.url, true);
      const { pathname } = parsedUrl;
      // if (/[^.]*\.(js|css)$/.test(pathname) && /_next/.test(pathname)) {
      //   const realPathname = pathname
      //     .replace(/_next\/static/, 'static')
      //     .replace(/_next\/[^/]*\//, '')
      //     .replace('page', 'bundles/pages');
      //   const filePath = join(__dirname, 'build', realPathname);
      //   await app.serveStatic(ctx.req, ctx.res, filePath);
      // } else {
      //   console.log(ctx.req.url); // eslint-disable-line
      //   await handle(ctx.req, ctx.res, parsedUrl);
      // }
      await handle(ctx.req, ctx.res, parsedUrl);
    });

    server.use(router.routes());

    server.listen(3000);
    console.log('server runs in 3000');
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

