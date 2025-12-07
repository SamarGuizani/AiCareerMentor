"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
      setIsChecking(false)

      if (user) {
        const timer = setTimeout(() => {
          router.push("/quiz")
        }, 2000)
        return () => clearTimeout(timer)
      }
    }

    checkAuth()
  }, [router])

  if (isChecking) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isLoggedIn ? "Welcome!" : "Check your email"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoggedIn ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your account has been created successfully. Redirecting you to the career quiz...
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/quiz">Go to Quiz Now</Link>
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've sent you a confirmation email. Please check your inbox and click the confirmation link to activate your account.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/login">Go to Login</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
