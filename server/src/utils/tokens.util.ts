import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, userRole: string) => {
  return jwt.sign({userId, userRole}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: process.env.ACCESS_TOKEN_LIFETIME});
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: process.env.REFRESH_TOKEN_LIFETIME});
}