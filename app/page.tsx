import SubmitDialog from "@/components/dialog/SubmitDialog";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CategoryDialog from "@/components/dialog/CategoryDialog";
import SortTimeTable from "@/components/tables/SortTimeTable";
import { authOptions } from "@/lib/auth";
import SignOut from "@/components/buttons/SignOut";
import DeleteDialog from "@/components/dialog/DeleteDialog";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userEmail = session.user?.email;

  if (!userEmail) {
    return { success: false, error: "User email not found" };
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }
  
  const category = await prisma.category.findMany({
    where: { userId: user.id },
  });
  
  const categoryList = await prisma.category.findMany({
    where: { userId: user.id },
    include: {
      time: true,
    },
  });

  return (
    <div className="px-4 md:px-[5rem] lg:px-[10rem] xl:px-[20rem] pt-14">
      <div className="flex flex-col md:flex-row gap-5 mb-3">
        <h1 className="text-[2rem] md:text-[3rem] font-semibold tracking-tighter leading-[0.75]">
          Time Tracker
        </h1>
        <SignOut />
        <div className="flex gap-2">
          <SubmitDialog category={category} />
          <CategoryDialog />
          <DeleteDialog category={category} />
        </div>
      </div>
      <p className="text-[1rem] md:text-[1.2rem] mt-2 mb-9">
        A simple time tracking app built with Next.js and Prisma.
      </p>
      <div className="border px-3 rounded-md overflow-x-auto">
        <SortTimeTable category={categoryList} />
      </div>
    </div>
  );
}
