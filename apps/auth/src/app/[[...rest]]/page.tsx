import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row justify-center">
      <SignIn />
      <a href="/sso-sign-in">go to sso login</a>
    </div>
  );
}
