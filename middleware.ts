import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/threads',
    '/profile',
    '/settings',
    '/api/webhook/clerk',
    '/api/uploadthing',
  ],
  ignoredRoutes: [
    '/api',
    '/api/webhook/clerk',
    '/api/uploadthing',
  ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 