import mongoose from "mongoose";

const isDevelopment = process.env.NODE_ENV !== "production";

const MONGODB_URI = isDevelopment
  ? process.env.MONGODB_URI_DEV
  : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    isDevelopment
      ? "Please define MONGODB_URI_DEV environment variable inside .env for development"
      : "Please define MONGODB_URI environment variable inside .env for production"
  );
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log(`MongoDB connected [${isDevelopment ? "DEV" : "PROD"}]`);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
