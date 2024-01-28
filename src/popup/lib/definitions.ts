export interface VisitedUrl {
  visitedUrl: string;
  googleId: string | null;
}

export interface LogUrlMessage {
  type: "logUrl";
  url: string;
}

export interface AuthUser {
  type: "authUser";
  googleId: string;
}
