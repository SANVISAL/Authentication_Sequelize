import { User } from "../../../models/user.model";
import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";
const privateKey = fs.readFileSync("private_key.pem", "utf8");
const publicKey = fs.readFileSync("public_key.pem", "utf8");

interface TokenPayload {
  userId: number;
  userName: string;
  password: string;
  aud: string;
  scope: string;
  jti: string;
  iat: number;
  exp: number;
}

export function generateJti(): string {
  return Math.random().toString(36).substring(7) + Date.now();
}

export const generateToken = async (
  user: User
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const Payload: TokenPayload = {
      userId: user.id,
      userName: user.userName,
      password: user.password,
      aud: "authentication",
      scope: "read:messages",
      jti: generateJti(),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
    };
    const accessToken = await jwt.sign(Payload, privateKey, {
      algorithm: "RS256",
    } as any);
    const refreshToken = jwt.sign({ userId: user.id }, privateKey, {
      algorithm: "RS256",
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

export const verifyToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const decoded = (await jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    })) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export const refreshToken = async (token: string) => {
  try {
  } catch (error) {}
};

export const getExpiryDate = (): Date => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // Add 30 days
  return expiresAt;
};

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
