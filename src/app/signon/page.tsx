'use client'

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SignOn() {

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
              placeholder="Digite sua nova senha"
              type="password"
            />
          </div>

          <div>
            <label htmlFor="password">Confirme a senha</label>
            <input
              disabled
              className="border border-slate-300 py-3 px-4 w-full my-2 cursor-not-allowed"
              placeholder="Repita sua nova senha"
              type="password"
            />
          </div>

          <button
            disabled
            className="text-white font-semibold bg-[#58C756] py-3 px-6 mt-4 w-full flex justify-center items-center gap-2 cursor-not-allowed">
            <span>Cadastrar</span>
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