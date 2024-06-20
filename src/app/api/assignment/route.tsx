import { NextRequest, NextResponse } from "next/server"
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
console.log(request.nextUrl.searchParams.get('assignment'))

  redirect('/dashboard')
}