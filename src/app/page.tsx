'use client'
import { Navbar, Card, CashIn, CashOut, Overview } from "@/components";

import { Banknote, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <section className="">
      <Navbar user={"computacaodanilo@gmail.com"} logOut={() => { }} />

      <div className='container mx-auto py-12'>

        <div className="w-full sm:flex-wrap flex justify-between items-center pb-6">
          <div className="flex justify-center items-center gap-4">
            <Banknote color="#333" size={16} />
            <h4 className="font-bold text-lg">Gerenciamento de Economias</h4>
          </div>

          <button className="justify-center items-center gap-4 md:flex hidden">
            <h4 className="font-bold text-md">24 / 02 / 2023</h4>
            <Calendar color="#333" size={16} />
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-between items-start pb-12 gap-8">

          <Card label={'Economia Mensal'} value={'R$ 5.000,00'} color={'bg-[#FFE247]'} />
          <Card label={'Economizado'} value={'R$ 25.000,00'} color={'bg-[#5DE950]'} />
          <Card label={'Meta'} value={'R$ 70.000,00'} color={'bg-[#5A75FF]'} />
          <Card label={'Alcance da Meta'} value={'32%'} color={'bg-[#BC67FF]'} />

        </div>

        <div className="w-full flex flex-wrap  justify-between items-start">

          <Overview date={""} economies={""} expenses={""} />
          <CashIn values={cashValues} />
          <CashOut values={cashValues} />

        </div>

      </div>

    </section>
  )
}

const cashValues = [
  {
    amount: 250,
    description: 'Conta de Luz',
  },
  {
    amount: 225,
    description: 'Conta de Internet',
  },
  {
    amount: 1300,
    description: 'Aluguel',
  },
]