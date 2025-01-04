import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  console.log("testing");
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom SAML flow.
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl={"/protected"}
      signUpForceRedirectUrl={"/protected"}
    />
  );
}
