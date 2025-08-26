enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  MODERATOR = "MODERATOR",
  STUDENT = "STUDENT",
}

enum UserStatus {
  ACTIVE = "ACTIVE", // 0-2 warnings
  WARNED = "WARNED", // 3-4 warnings
  SUSPENDED = "SUSPENDED", // 5-9 warnings (temporary)
  BANNED = "BANNED", // 10+ warnings (permanent)
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
