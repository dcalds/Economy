import React from 'react';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react';

type Props = {
    children: React.ReactNode,
};

export const AuthProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <Session>
                {children}
            </Session>
        </SessionProvider>
    );
}

export const Session = ({ children }: Props) => {
    const { status } = useSession()

    if (status === 'unauthenticated') {
        redirect('/signin');
    }

    if (status === 'loading') {
        return (<></>);
    }

    return (
        <>
            {children}
        </>
    );
}