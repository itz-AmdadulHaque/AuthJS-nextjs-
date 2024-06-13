import Image from "next/image";
import Logout from "@/components/Logout";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div className="flex flex-col items-center m-4">
    {/* user login with crediential email and pass don't have image */}
      {session?.user?.name && session?.user?.image ? (
        <>
          <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={72}
            height={72}
            className="rounded-full"
          />
        </>
      ) : (
        <h1 className="text-3xl my-2">Welcome, {session?.user?.email}</h1>
      )}
      <Logout />
      
    </div>
  );
};

export default HomePage;
