'use client'

import moment from 'moment';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal } from 'react-responsive-modal';

import { signOut } from 'next-auth/react';

import { Banknote, Calendar } from 'lucide-react';

import { Navbar, Card, CashIn, CashOut, Overview } from "@/components";
import { InputUserFinancesProps } from '@/utils';

import { useFinances } from '@/hooks/useFinances';
import { calcPercentage, numberWithCommas } from '@/utils/functions';

export default function Home() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<InputUserFinancesProps>();

  const {
    isLoading,
    userData,
    sumCashIn,
    sumCashOut,
    setUserFinances,
    session,
    setCashIn,
    updateCashIn,
    deleteCashIn,
    setCashOut,
    updateCashOut,
    deleteCashOut,
  } = useFinances();

  const [open, setOpen] = useState<boolean>(false);

  // MODAL HANDLERS
  const onOpenModal = () => {
    setOpen(true);
    setValue('montlyEco', userData[0]?.montlyEco ?? '');
    setValue('economyEco', userData[0]?.economyEco ?? '');
    setValue('goalEco', userData[0]?.goalEco ?? '');
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  // FORM SUBMITTERS
  const onSubmitUserFinances: SubmitHandler<InputUserFinancesProps> = async data => {
    onCloseModal();
    setUserFinances(data);
  };

  const logout = async () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <section className="">
      <Navbar data={session?.user} logOut={logout} openSettings={onOpenModal} />

      {open && (
        <Modal open={open} onClose={onCloseModal} center>
          <form onSubmit={handleSubmit(onSubmitUserFinances)} className='container mx-auto pt-6 max-w-md w-full flex flex-col justify-center items-start gap-4'>

            <h1 className='text-xl font-bold'>Gerenciamento</h1>
            <label className='text-sm mb-4'>Informe alguns dados importates</label>

            <div className='w-full'>
              <label htmlFor="montlyEco">Quanto deseja economizar mensalmente?</label>
              <input
                className="border border-slate-300 py-3 px-4 w-full my-2"
                placeholder="Digite um valor numerico"
                type="number"
                {...register("montlyEco", { required: true })}
              />
            </div>

            <div className='w-full'>
              <label htmlFor="economyEco">Quanto tem economizado hoje?</label>
              <input
                className="border border-slate-300 py-3 px-4 w-full my-2"
                placeholder="Digite um valor numerico"
                type="number"
                {...register("economyEco", { required: true })}
              />
            </div>

            <div className='w-full'>
              <label htmlFor="goalEco">Qual sua meta anual de economias?</label>
              <input
                className="border border-slate-300 py-3 px-4 w-full my-2"
                placeholder="Digite um valor numerico"
                type="number"
                {...register("goalEco", { required: true })}
              />
            </div>

            <div className="w-full max-w-sm flex justify-between items-center pb-6">
              <button
                type='submit'
                className="font-semibold bg-yellow-500 hover:bg-yellow-400 transition-all py-3 px-6 mt-4 w-full flex justify-center items-center gap-2">
                <span>Continuar</span>
              </button>
            </div>

          </form>
        </Modal>
      )}

      <div className='container mx-auto py-12'>

        <div className="w-full sm:flex-wrap flex justify-between items-center pb-6">
          <div className="flex justify-center items-center gap-4">
            <Banknote color="#333" size={16} />
            <h4 className="font-bold text-lg">Gerenciamento de Economias</h4>
          </div>

          <button className="justify-center items-center gap-4 md:flex hidden">
            <h4 className="font-bold text-md">{moment().format('L')}</h4>
            <Calendar color="#333" size={16} />
          </button>
        </div>

        <div className="w-full flex flex-wrap justify-between items-start pb-12 gap-8">
          <Card label={'Economia Mensal'} value={isLoading ? '-' : (`R$ ${numberWithCommas(userData[0]?.montlyEco) || '0'}`)} color={'bg-[#FFE247]'} />
          <Card label={'Economizado'} value={isLoading ? '-' : (`R$ ${numberWithCommas(userData[0]?.economyEco) || '0'}`)} color={'bg-[#5DE950]'} />
          <Card label={'Meta'} value={isLoading ? '-' : (`R$ ${numberWithCommas(userData[0]?.goalEco) || '0'}`)} color={'bg-[#5A75FF]'} />
          <Card label={'Alcance da Meta'} value={isLoading ? '-' : calcPercentage(userData[0]?.economyEco, userData[0]?.goalEco) + '%'} color={'bg-[#BC67FF]'} />
        </div>

        {userData[0]?.montlyEco && (
          <div className="w-full flex flex-wrap  justify-between items-start">
            <Overview date={moment().format('L')} economies={isLoading ? 0 : sumCashIn} expenses={isLoading ? 0 : sumCashOut} />
            <CashIn values={isLoading ? [] : userData[0]?.cashIn} setCashIn={setCashIn} updateCashIn={updateCashIn} deleteCashIn={deleteCashIn} />
            <CashOut values={isLoading ? [] : userData[0]?.cashOut} setCashOut={setCashOut} updateCashOut={updateCashOut} deleteCashOut={deleteCashOut} />
          </div>
        )}

      </div>

    </section>
  )
}