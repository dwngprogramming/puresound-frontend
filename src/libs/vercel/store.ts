import {Redis} from "@upstash/redis";

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
  };
  
  // TTL = Infinite
  await redis.set(token, JSON.stringify(payload));
  
  return token;
}

export async function identifyToken(token: string): Promise<StagingUser | null> {
  const rawData = await redis.get<StagingUser>(token);
  if (!rawData) return null;
  try {
    return rawData;
  } catch (e) {
    console.error("Error when get Redis Data:", e);
    return null; // Nếu dữ liệu lỗi thì coi như không hợp lệ
  }
}