import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextMiddleware, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

// export const middleware: NextMiddleware = async (req) => {
//   if (req.nextUrl.pathname === '/') {
//     const session = await getToken({
//       req: req as unknown as NextApiRequest,
//       secret: process.env.NEXT_PUBLIC_SECRET as string,
//       // secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
//       secureCookie: false,
//     })
//     // You could also check for any property on the session object,
//     // like role === "admin" or name === "John Doe", etc.
//     console.log(session)
//     console.log(process.env.NEXT_PUBLIC_SECRET)
//     if (!session) return NextResponse.redirect('/api/auth/signin')
//     // If user is authenticated, continue.
//   }
// }
