"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import * as React from "react";

export default function OauthSignIn() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  if (!signIn || !signUp) return null;

  const signInWith = (e: React.FormEvent) => {
    e.preventDefault();

    const email: string = (e.target as HTMLFormElement).email.value;

    signIn
      .authenticateWithRedirect({
        identifier: email,
        strategy: "saml",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err.errors);
        console.error(err, null, 2);
      });
  };

  // Render a button for each supported SAML provider
  // you want to add to your app
  return (
    <form onSubmit={(e) => signInWith(e)}>
      <input
        className="text-black"
        type="email"
        name="email"
        placeholder="Enter email address"
      />
      <button type="submit">Sign in with SAML</button>
    </form>
  );
}
