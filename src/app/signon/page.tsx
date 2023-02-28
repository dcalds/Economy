'use client'

import Link from 'next/link';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from "react";

import { CheckCircle } from 'lucide-react';
import { auth, googleProvider } from "../../config/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function SignOn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async () => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

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

          <div className='h-1 w-full bg-[#58C756]'></div>

          <h1 className="font-bold text-xl pt-6">
            Cadastrar
          </h1>

          <p className='text-sm pb-4'>Crie sua conta com email e senha</p>

          <div>
            <label htmlFor="email">Email</label>
            <input
              className="border border-slate-300 py-3 px-4 w-full my-2"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Senha</label>
            <input
              className="border border-slate-300 py-3 px-4 w-full my-2"
              placeholder="Digite sua nova senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Confirme a senha</label>
            <input
              className="border border-slate-300 py-3 px-4 w-full my-2"
              placeholder="Repita sua nova senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={true}
            onClick={signInWithEmail}
            className="text-white font-semibold bg-[#58C756] hover:bg-[#3BBA39] transition-all py-3 px-6 mt-4 w-full flex justify-center items-center gap-2">
            <span>Entrar</span>
            <CheckCircle color="white" size={16} />
          </button>

          <div className='text-sm pt-2 pb-6'>
            <span>Já tem cadastro?</span>{' '}
            <Link href="/signin" className='text-[#58C756] hover:text-[#3BBA39] underline-offset-2 underline'>
              Entre em sua conta aqui
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}