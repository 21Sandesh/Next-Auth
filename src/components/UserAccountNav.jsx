'use client';

import { Button } from "../components/ui/button";
import { signOut } from 'next-auth/react';
import { useToast } from "../components/ui/use-toast";


const UserAccountNav = () => {
    const { toast } = useToast();
    const logOut = async () => {
    await signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
    });

    toast({
        title : 'Success',
        description: "Log Out Successfull!",
        variant: 'success',
      });
    };

    return (
        <Button onClick={logOut} variant='destructive'>Sign Out</Button>
    );
};

export default UserAccountNav;