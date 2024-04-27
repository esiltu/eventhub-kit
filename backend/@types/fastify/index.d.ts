// index.d.ts

import { FastifyInstance } from 'fastify';
import { Connection } from 'mongoose';
import mongoose from 'mongoose';
import fastifyJwt from 'fastify-jwt';

declare module 'fastify' {
  export interface FastifyInstance {
    db: typeof mongoose;

    jwt: {
      sign: (payload: object, options?: fastifyJwt.SignOptions | undefined) => string;
      verify: (token: string, options?: fastifyJwt.VerifyOptions | undefined) => Promise<object>;
      decode: (
        token: string,
        options?: fastifyJwt.DecodeOptions | undefined
      ) => null | object | string;
    };
  }
}
