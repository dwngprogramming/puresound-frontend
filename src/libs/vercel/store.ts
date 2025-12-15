import {Redis} from "@upstash/redis";

const STORE_KEY = 'staging-tokens';
const redis = Redis.fromEnv();

interface StagingUser {
  name: string;
  role: string;
  createdAt: number;
}

export async function createStagingToken(name: string, role: string) {
  const crypto = require('crypto');
  const token: string = crypto.randomBytes(16).toString('hex');
  
  const payload: StagingUser = {
    name: name,
    role: role,
    createdAt: Date.now()
  }
  
  await redis.hset(STORE_KEY, {[token]: JSON.stringify(payload)});
  
  return token;
}

export async function identifyToken(token: string): Promise<StagingUser | null> {
  const rawData = await redis.hget(STORE_KEY, token) as object | null;
  if (!rawData) return null;
  console.log("Raw data from store:", rawData);
  try {
    return rawData as StagingUser;
  } catch (e) {
    console.error("Error when get Redis Data:", e);
    return null; // Nếu dữ liệu lỗi thì coi như không hợp lệ
  }
}