"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const authProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default authProvider;
