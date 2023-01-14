import { NextResponse } from "next/server";

// export { default } from 'next-auth/middleware';

// export const config = {matcher: ["/add", "/dashboard/:path*"]}

export default function middleware(req){
    const verify = req.cookies.get('next-auth.session-token')
    const url = req.url;

    // if(!verify && url.includes('/admin')){
    //     return NextResponse.redirect(process.env.NEXT_PUBLIC_HOST+'/404')
    // }

    if(verify && (url.includes('/login') || url.includes('/signup'))){
        return NextResponse.redirect(process.env.NEXT_PUBLIC_HOST+'/')
    }
}