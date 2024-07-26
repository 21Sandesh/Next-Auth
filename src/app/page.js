import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">Auth</h1>
      <Link className={buttonVariants()} href="/dashboard">Dashboard</Link>
    </div>
  );
}
