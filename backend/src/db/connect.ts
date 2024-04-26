import mongoose, { Connection } from "mongoose";

export function Connect(connURI: string): Promise<typeof mongoose> {
  return mongoose.connect(connURI);
}
