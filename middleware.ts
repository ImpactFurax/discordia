import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    '/',
    '/threads',
    '/threads/:id',
    '/settings',
    '/api/webhook/clerk',
    '/api/uploadthing',
    '/admin/dashboard',
    '/admin/users',
    '/admin/threads',
  ],
  ignoredRoutes: [
    '/api',
    '/api/webhook/clerk',
    '/api/uploadthing',
  ],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 