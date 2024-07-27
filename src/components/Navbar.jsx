import Link from 'next/link';
import { buttonVariants } from '../components/ui/button';
import { authOptions } from '../lib/auth';
import { getServerSession } from 'next-auth';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                <Link href="/">Logo</Link>
                <div>
                    {session?.user ? (
                        <UserAccountNav />
                    ) : (
                        <div>
                            <Link href="/sign-in" className={buttonVariants()}>SignIn</Link>
                            <Link href="/sign-up" className={buttonVariants()}>SignUp</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;