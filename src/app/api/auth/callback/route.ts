import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      let finalRedirect = next;
      
      // If heading to dashboard, check if user is an admin
      if (next === '/dashboard' && sessionData?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionData.user.id)
          .single();
          
        if (profile?.role === 'admin') {
          finalRedirect = '/admin';
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${finalRedirect}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${finalRedirect}`)
      } else {
        return NextResponse.redirect(`${origin}${finalRedirect}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}
