import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/threads',
    '/profile',
    '/settings',
    '/api/webhook/clerk',
  ],
  ignoredRoutes: [
    '/api',
    '/api/webhook/clerk',
  ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 