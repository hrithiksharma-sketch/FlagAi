import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Suspense } from "react"

function SignUpSuccessContent({ needsConfirmation }: { needsConfirmation: boolean }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{needsConfirmation ? "Check Your Email" : "Account Created!"}</CardTitle>
              <CardDescription>
                {needsConfirmation ? "Confirm your email to get started" : "Welcome to FLAG AI Hub"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {needsConfirmation ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    We sent a confirmation email to your inbox. Please click the link in the email to verify your
                    account and complete the sign-up process.
                  </p>
                  <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                    <p className="font-medium">Next steps:</p>
                    <ol className="mt-2 list-inside list-decimal space-y-1 text-muted-foreground">
                      <li>Check your email inbox</li>
                      <li>Click the confirmation link</li>
                      <li>Sign in to access your dashboard</li>
                    </ol>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your account has been successfully created. You can now sign in and start managing your contracts.
                </p>
              )}
              <Button asChild className="w-full">
                <Link href="/auth/login">Continue to Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function SignUpSuccessPage({
  searchParams,
}: {
  searchParams: { confirmation?: string }
}) {
  const needsConfirmation = searchParams.confirmation === "required"

  return (
    <Suspense fallback={<div className="flex min-h-svh w-full items-center justify-center">Loading...</div>}>
      <SignUpSuccessContent needsConfirmation={needsConfirmation} />
    </Suspense>
  )
}
