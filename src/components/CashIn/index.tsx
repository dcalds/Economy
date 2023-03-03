import { useState } from 'react';
import Modal from 'react-responsive-modal';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ArrowUpCircle, PlusCircle } from 'lucide-react';

import { CashInProps, InputUserFinancesProps } from '@/utils';
import { useFinances } from '@/hooks';

export const CashIn = ({ values }: CashInProps) => {

    const { setCashIn } = useFinances();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<InputUserFinancesProps>();

    const [openCashIn, setOpenCashIn] = useState<boolean>(false);

    const onSubmitCashIn: SubmitHandler<InputUserFinancesProps> = async data => {
        setOpenCashIn(false)
        setCashIn(data);
    };

    return (
        <div className="w-full xl:max-w-md lg:max-w-[280px] mx-w-xl flex flex-col gap-6 pb-6">
            <div className="flex justify-start items-center gap-4">
                <ArrowUpCircle color="#333" size={16} />
                <h4 className="font-bold text-lg">Ganhos</h4>
            </div>

            {openCashIn && (
                <Modal open={openCashIn} onClose={() => setOpenCashIn(false)} center>
                    <form
                        onSubmit={handleSubmit(onSubmitCashIn)}
                        className='container mx-auto pt-6 max-w-md w-full flex flex-col justify-center items-start gap-4'>

                        <h1 className='text-xl font-bold'>Adicionar Entrada</h1>
                        <label className='text-sm mb-4'>Informe o valor e uma descricao</label>

                        <div className='w-full'>
                            <label htmlFor="cashIn.amount">Qual o valor da entrada?</label>
                            <input
                                className="border border-slate-300 py-3 px-4 w-full my-2"
                                placeholder="Digite um valor numerico"
                                type="number"
                                {...register("cashIn.amount", { required: true })}
                            />
                        </div>

                        <div className='w-full'>
                            <label htmlFor="cashIn.description">Qual a descricao da entrada?</label>
                            <input
                                className="border border-slate-300 py-3 px-4 w-full my-2"
                                placeholder="Digite uma descricao"
                                type="text"
                                {...register("cashIn.description", { required: true })}
                            />
                        </div>

                        <div className="w-full max-w-sm flex justify-between items-center pb-6">
                            <button
                                type='submit'
                                className="font-semibold bg-green-500 hover:bg-green-700 transition-all py-3 px-6 mt-4 w-full flex justify-center items-center gap-2">
                                <span>Continuar</span>
                            </button>
                        </div>

                    </form>
                </Modal>
            )}

            {values?.map((element, index) => {
                return (
                    <div key={index} className='flex items-center gap-4 bg-white cursor-pointer transition-all hover:drop-shadow-md'>
                        <div className='h-16 max-h- w-1 bg-[#5DE950]' />
                        <p className='font-bold text-lg'>R$ {element.amount}</p>
                        <p>{element.description}</p>
                    </div>
                )
            })}

            <button onClick={() => setOpenCashIn(true)} className="flex justify-start items-center gap-4">
                <PlusCircle color="#333" size={16} />
                <h4 className="font-normal">Adicionar</h4>
            </button>
        </div>
    )
}