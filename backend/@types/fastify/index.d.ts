import { FastifyInstance } from "fastify";
import { Connection } from "mongoose";
import mongoose from "mongoose";

declare module "fastify" {
  export interface FastifyInstance {
    db: typeof mongoose;
  }
}
