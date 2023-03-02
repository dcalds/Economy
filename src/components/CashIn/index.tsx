import { CashInProps } from '@/utils';
import { ArrowUpCircle, PlusCircle } from 'lucide-react';

export const CashIn = ({ values, addCash }: CashInProps) => {
    return (
        <div className="w-full xl:max-w-md lg:max-w-[280px] mx-w-xl flex flex-col gap-6 pb-6">
            <div className="flex justify-start items-center gap-4">
                <ArrowUpCircle color="#333" size={16} />
                <h4 className="font-bold text-lg">Ganhos</h4>
            </div>

            {
                values?.map((element, index) => {
                    return (
                        <div key={index} className='flex items-center gap-4 bg-white'>
                            <div className='h-16 max-h- w-1 bg-[#5DE950]' />
                            <p className='font-bold text-lg'>R$ {element.amount}</p>
                            <p>{element.description}</p>
                        </div>
                    )
                })
            }

            <button onClick={addCash} className="flex justify-start items-center gap-4">
                <PlusCircle color="#333" size={16} />
                <h4 className="font-normal">Adicionar</h4>
            </button>
        </div>
    )
}