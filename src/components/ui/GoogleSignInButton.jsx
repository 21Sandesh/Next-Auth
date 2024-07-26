import React, { Children } from 'react';
import { Button } from '@/components/ui/button';

const GoogleSignInButton = ({ children }) => {
    const loginWithGoogle = () => {
        console.log("Google Sign In");
    };
    return (
        <Button onClick={loginWithGoogle} className='w-full'>
        {children}
        </Button>
    );
}

export default GoogleSignInButton;