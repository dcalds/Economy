'use client'

import { Modal } from 'react-responsive-modal';
import { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from "react-hook-form";

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import { Banknote, Calendar } from 'lucide-react';

import { Navbar, Card, CashIn, CashOut, Overview } from "@/components";

import { db, auth, storage } from "@/config/firebase";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

type Inputs = {
  montlyEco: number,
  economyEco: number,
  goalEco: number,
};

export default function Home() {
  const { data: session } = useSession()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
    setValue('montlyEco', userData[0]?.montlyEco ?? '');
    setValue('economyEco', userData[0]?.economyEco ?? '');
    setValue('goalEco', userData[0]?.goalEco ?? '');
    
  };
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    getUserFinances();
  }, []);

  const financesCollectionRef = collection(db, `${session?.user?.email}-fin`);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      onCloseModal();
      setIsLoading(true);
      if (!userData[0]?.id) {
        return await addDoc(financesCollectionRef, {
          goalEco: data.goalEco,
          economyEco: data.economyEco,
          montlyEco: data.montlyEco,
          id: `${session?.user?.email}-id`,
        });
      } else {
        const financesDoc = doc(db, `${session?.user?.email}-fin`, userData[0]?.id);
        return await updateDoc(financesDoc, {
          goalEco: data.goalEco,
          economyEco: data.economyEco,
          montlyEco: data.montlyEco,
        });
      }

    } catch (err) {
      console.error(err);
    } finally {
      getUserFinances();
      setIsLoading(false);
    }
  };

  const getUserFinances = async () => {
    try {
      setIsLoading(true);
      const data = await getDocs(financesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(filteredData);
      console.log('filteredData: ', filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addCash = async () => {
    try {
      setIsLoading(true);
      const financesDoc = doc(db, `${session?.user?.email}-fin`, userData[0]?.id);
      await updateDoc(financesDoc, {
        cashIn: [...userData[0].cashIn, {
          amount: '500',
          description: 'Salario',
        }],
      });
    } catch (err) {
      console.error(err);
    } finally {
      getUserFinances();
      setIsLoading(false);
    }
  };

  const subCash = async () => {
    try {
      setIsLoading(true);
      const financesDoc = doc(db, `${session?.user?.email}-fin`, userData[0]?.id);
      await updateDoc(financesDoc, {
        cashOut: [...userData[0].cashOut, {
          amount: '500',
          description: 'Salario',
        }],
      });
    } catch (err) {
      console.error(err);
    } finally {
      getUserFinances();
      setIsLoading(false);
    }
  };

  // const deleteCash = async () => {
  //   const financesDoc = doc(db, `${session?.user?.email}-fin`, userData[0]?.id);
  //   await deleteDoc(movieDoc);
  // };

  const logout = async () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <section className="">
      <Navbar data={session?.user} logOut={logout} openSettings={onOpenModal} />

      {
        open && (
          <Modal open={open} onClose={onCloseModal} center>
            <form onSubmit={handleSubmit(onSubmit)} className='container mx-auto pt-6 max-w-md w-full flex flex-col justify-center items-start gap-4'>

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
        )
      }

      {
        !isLoading && (
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

              <Card label={'Economia Mensal'} value={`R$ ${userData[0]?.montlyEco || '0'}`} color={'bg-[#FFE247]'} />
              <Card label={'Economizado'} value={`R$ ${userData[0]?.economyEco || '0'}`} color={'bg-[#5DE950]'} />
              <Card label={'Meta'} value={`R$ ${userData[0]?.goalEco || '0'}`} color={'bg-[#5A75FF]'} />
              <Card label={'Alcance da Meta'} value={'0%'} color={'bg-[#BC67FF]'} />

            </div>

            <div className="w-full flex flex-wrap  justify-between items-start">

              <Overview date={""} economies={""} expenses={""} />
              <CashIn values={userData[0]?.cashIn} addCash={addCash} />
              <CashOut values={userData[0]?.cashOut} subCash={subCash} />

            </div>

          </div>
        )
      }


    </section>
  )
}
