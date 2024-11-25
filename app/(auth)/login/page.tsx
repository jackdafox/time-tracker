import LoginPage from "@/components/page/LoginPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return (
    <LoginPage/>
  );
}