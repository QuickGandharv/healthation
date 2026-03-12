import { Suspense } from "react"
import ResetPasswordClient from "./ResetPasswordClient"

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordClient token={params?.token ?? ""} />
    </Suspense>
  )
}