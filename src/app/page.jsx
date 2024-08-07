import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import User from "../components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className="text-4xl">Auth</h1>
      <Link className={buttonVariants()} href="/dashboard">Dashboard</Link>

      <h2>Client Session</h2>
      <User />

      <h2>Server Session</h2>
      {JSON.stringify(session, null, 2)}

    </div>
  );
}
