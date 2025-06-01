import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
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