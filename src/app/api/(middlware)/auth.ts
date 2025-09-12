import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET as string;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const signToken = (payload: Record<string, any>): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
};

export const verifyToken = (token: string): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
  } catch (_error) {
    return null;
  }
};

// Check if token is expired (client-side)
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

// Get time until token expires (in minutes)
export const getTimeUntilExpiry = (token: string): number | null => {
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded || !decoded.exp) return null;

    const currentTime = Date.now() / 1000;
    const timeLeft = decoded.exp - currentTime;
    return Math.max(0, Math.floor(timeLeft / 60)); // Return minutes
  } catch {
    return null;
  }
};
