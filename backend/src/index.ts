import fastify from 'fastify';
import path from 'node:path';
import fs from 'node:fs';
import { Connect } from './db/connect';
import user from './ajv-schemas/user/user';
import login from './ajv-schemas/user/login';

require('dotenv').config();

const server = fastify({ logger: true });

Connect(process.env['CONN_STRING_URI'] as any)
  .then((conn) => {
    server.db = conn;
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });

server.addSchema(user);
server.addSchema(login);

var ROUTES = fs.readdirSync(path.join(__dirname, 'routes'));

(async () => {
  for (let i = 0; i < ROUTES.length; i++) {
    let path_ = path.join(__dirname, 'routes', ROUTES[i]);
    let stat = fs.statSync(path_);

    if (stat.size === 0) continue;

    if (stat.isDirectory()) {
      let files = fs.readdirSync(path_);
      for (let x = 0; x < files.length; x++) {
        path_ = path.join(path_, files[x]);
        stat = fs.statSync(path_);
        if (stat.isFile()) {
          await server.register(require(path_));
        }
      }
      continue;
    }

    if (stat.isFile()) {
      await server.register(require(path_));
    }
  }
  ROUTES = null as any;

  server.get('/', async (request, reply) => {
    return reply.send({
      success: true,
      message: 'Backend Server Made By Eray',
    });
  });

  server.setNotFoundHandler((request, reply) => {
    reply.code(404).send({
      success: false,
      message: '404 Not Found - Backend Server Made By Eray',
    });
  });

  await server.listen({ port: 3000 }).catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
})();
