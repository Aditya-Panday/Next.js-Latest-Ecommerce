import {
  clerkMiddleware,
  createRouteMatcher,
  redirectToSignIn,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/checkout",
  "/user/orders",
  "/contact-page",
  "/user/profile",
]);

export default clerkMiddleware(async (auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});
export const config = {
  matcher: [
    // Skip static files & internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API routes
    "/(api|trpc)(.*)",
  ],
};

// -- Create a "tasks" table with a user_id column that maps to a Clerk user ID
// create table tasks(
//   id serial primary key,
//   name text not null,
//   user_id text not null default auth.jwt()->>'sub'
// );

// -- Enable RLS on the table
// alter table "tasks" enable row level security;
