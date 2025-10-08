import { PrivateRoute } from "@/components/auth/PrivateRoute"
import { USER_ROLES } from "@/types/interfaces"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PrivateRoute requiredRoles={[USER_ROLES.MEMBER]}>
        {children}
      </PrivateRoute>
    </>
  )
}