enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  MODERATOR = "MODERATOR",
  STUDENT = "STUDENT",
}

enum UserStatus {
  ACTIVE = "ACTIVE",
  WARNED = "WARNED",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
}

export interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: UserStatus;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}
