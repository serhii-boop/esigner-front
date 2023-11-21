export interface JwtPayload {
  tenantId: string;
  sub: string;
  roles: {
    authority: string;
  }[];
  iat: number;
  exp: number;
}

export interface WorkerType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenantId: number;
}