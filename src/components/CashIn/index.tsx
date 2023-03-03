import { useState } from 'react';
import Modal from 'react-responsive-modal';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ArrowUpCircle, PlusCircle } from 'lucide-react';

import { CashInProps, CashProps, InputUserFinancesProps } from '@/utils';

export const CashIn = ({ values, setCashIn, updateCashIn, deleteCashIn }: CashInProps) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<InputUserFinancesProps>();

    const [openCashIn, setOpenCashIn] = useState<boolean>(false);
    const [openCashInEdit, setOpenCashInEdit] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

    const [indexEdit, setIndexEdit] = useState<number>(0);

    // HANDLE SUBMITTERS - CASH OUT
    const onSubmitCashIn: SubmitHandler<InputUserFinancesProps> = async data => {
        setOpenCashIn(false)
        setCashIn(data);
    };

    const onSubmitEditCashIn: SubmitHandler<InputUserFinancesProps> = async data => {
        setOpenCashInEdit(false);
        updateCashIn(data, indexEdit);
    }

    // MODAL CONTROLLERS - CASH OUT
    const addNewCashInValue = () => {
        setOpenCashIn(true);

        setValue('cashIn.amount', '');
        setValue('cashIn.description', '');
    }

    const editCashInValue = (element: CashProps, index: number) => {
        setOpenCashInEdit(true);
        setIndexEdit(index);

        setValue('cashIn.amount', element.amount ?? 0);
        setValue('cashIn.description', element.description ?? '');
    }

    const onDeleteCashIn = () => {
        deleteCashIn(indexEdit);
        setOpenCashInEdit(false);
    }

    const onCloseDeleteModal = () => {
        setOpenConfirmDelete(false);
        setOpenCashInEdit(false);
        onDeleteCashIn();
    }

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
                                className="text-white font-semibold bg-green-500 hover:bg-green-700 transition-all py-3 px-6 mt-4 w-full flex justify-center items-center gap-2">
                                <span>Continuar</span>
                            </button>
                        </div>

                    </form>
                </Modal>
            )}

            {openCashInEdit && (
                <Modal open={openCashInEdit} onClose={() => setOpenCashInEdit(false)} center>
                    <form
                        onSubmit={handleSubmit(onSubmitEditCashIn)}
                        className='container mx-auto pt-6 max-w-md w-full flex flex-col justify-center items-start gap-4'>

                        <h1 className='text-xl font-bold'>Editar Entrada</h1>
                        <label className='text-sm mb-4'>Edite o valor e/ou descricao</label>

                        <div className='w-full'>
                            <label htmlFor="cashIn.amount">Qual o novo valor da entrada?</label>
                            <input
                                className="border border-slate-300 py-3 px-4 w-full my-2"
                                placeholder="Digite um valor numerico"
                                type="number"
                                {...register("cashIn.amount", { required: true })}
                            />
                        </div>

                        <div className='w-full'>
                            <label htmlFor="cashIn.description">Qual a nova descricao da entrada?</label>
                            <input
                                className="border border-slate-300 py-3 px-4 w-full my-2"
                                placeholder="Digite uma descricao"
                                type="text"
                                {...register("cashIn.description", { required: true })}
                            />
                        </div>

                        <div className="w-full max-w-sm flex flex-col justify-between items-center">
                            <button
                                type='submit'
                                className="text-white font-semibold bg-green-500 hover:bg-green-700 transition-all py-3 px-6 mt-4 w-full flex justify-center items-center gap-2">
                                <span>Salvar</span>
                            </button>

                            <button type='button' onClick={() => setOpenConfirmDelete(true)} className='text-red-500 text-sm py-4'>
                                Deletar
                            </button>
                        </div>



                    </form>
                </Modal>
            )}

            {openConfirmDelete && (
                <Modal open={openConfirmDelete} onClose={onCloseDeleteModal} center>
                    <form
                        onSubmit={handleSubmit(onSubmitEditCashIn)}
                        className='container mx-auto pt-6 max-w-md w-full flex flex-col justify-center items-start gap-4'>

                        <h1 className='text-xl font-bold'>Desejar deletar?</h1>
                        <label className='text-sm'>A exclusao sera permanente</label>

                        <div className="w-full max-w-sm flex flex-col justify-between items-center pb-6">
                            <button
                                onClick={onCloseDeleteModal}
                                type='button'
                                className="text-white font-semibold bg-red-500 hover:bg-red-700 transition-all py-3 px-6 mt-4 w-full flex justify-center items-center gap-2">
                                <span>Confirmar</span>
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {values?.map((element, index) => {
                return (
                    <div key={index} onClick={() => editCashInValue(element, index)} className='flex items-center gap-4 bg-white cursor-pointer transition-all hover:drop-shadow-md'>
                        <div className='h-16 max-h- w-1 bg-[#5DE950]' />
                        <p className='font-bold text-lg'>R$ {element.amount}</p>
                        <p>{element.description}</p>
                    </div>
                )
            })}

            <button onClick={() => addNewCashInValue()} className="flex justify-start items-center gap-4">
                <PlusCircle color="#333" size={16} />
                <h4 className="font-normal">Adicionar</h4>
            </button>
        </div>
    )
}