'use client'

import Link from "next/link"

export default function Home() {
  return (
    <section className="container mx-auto flex flex-col gap-8 items-center justify-center py-10">
      <h1 className="font-bold text-xl">Gerenciamento Financeiro</h1>
      <Link href={"/signin"}>
        <button className="bg-blue-500 hover:bg-blue-700 transition-all py-3 px-20 rounded text-white">
          Sign In
        </button>
      </Link>
    </section>
  )
}
