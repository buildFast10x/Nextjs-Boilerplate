import { getServerSession } from "next-auth";
import { authOptions } from "./config";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  } | null;
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
