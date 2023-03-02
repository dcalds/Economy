'use client'

import Link from 'next/link';
import Image from 'next/image'

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { LogIn } from 'lucide-react';

import { useState } from "react";

export default function SignIn() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
      // const data = await signInWithPopup(auth, googleProvider);
      // console.log(data);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-col justify-center items-center pt-20">

        <div className="bg-white w-full flex flex-col max-w-sm px-6 gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]">

          <div className='h-1 w-full bg-[#5A75FF]'></div>

          <h1 className="font-bold text-xl pt-6">
            Entrar
          </h1>

          <p className='text-sm'>Use sua conta google ou email e senha</p>

          <button
            onClick={signInWithGoogle}
            className="text-sm font-semibold bg-[#F1F5F8] hover:bg-[#E6EDF2] w-full transition-all py-3 px-6 my-4 flex justify-center items-center gap-2">
            <Image
              src="/google.png"
              alt="User"
              width={16}
              height={16}
              priority
            />
            <span>Entrar com Google</span>
          </button>

          <div className='flex justify-between items-center pb-4'>
            <div className='h-px w-full max-w-[120px] bg-[#E1E3E4]'></div>
            <span className=''>ou</span>
            <div className='h-px w-full max-w-[120px] bg-[#E1E3E4]'></div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              disabled
              className="border border-slate-300 py-3 px-4 w-full my-2 cursor-not-allowed"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label htmlFor="password">Senha</label>
            <input
              disabled
              className="border border-slate-300 py-3 px-4 w-full my-2 cursor-not-allowed"
              placeholder="Digite sua senha"
              type="password"
            />
          </div>

          <button
            disabled
            className="text-white font-semibold bg-[#5A75FF] py-3 px-6 mt-4 w-full flex justify-center items-center gap-2 cursor-not-allowed">
            <span>Entrar</span>
            <LogIn color="white" size={16} />
          </button>

          <div className='text-sm pt-2 pb-6'>
            <span>Ainda não tem cadastro?</span>{' '}
            <Link href="/signon" className='text-[#5A75FF] hover:text-[#415CE9] underline-offset-2 underline'>
              Criar nova conta aqui
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}