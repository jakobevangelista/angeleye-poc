import { clerkMiddleware, currentUser } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, request) => {
  const user = auth();
  //   const user = await currentUser();

  if (user.userId !== null) {
    // Check user attributes and redirect
    // if (user.samlAccounts.length > 0) {
    const res = await fetch(`https://api.clerk.com/v1/users/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });
    const data = await res.json();
    // console.log(data.saml_accounts.length);
    if (data.saml_accounts.length > 0) {
      return Response.redirect(new URL(`${process.env.BUSINESS_URL}`));
    } else {
      return Response.redirect(new URL(`${process.env.CONSUMER_URL}`));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
