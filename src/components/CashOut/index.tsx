import { CashOutProps } from '@/utils';
import { ArrowDownCircle, PlusCircle } from 'lucide-react';

export const CashOut = ({ values, subCash }: CashOutProps) => {
    return (
        <div className="w-full xl:max-w-md lg:max-w-[280px] mx-w-xl flex flex-col gap-6 pb-6">
            <div className="flex justify-start items-center gap-4">
                <ArrowDownCircle color="#333" size={16} />
                <h4 className="font-bold text-lg">Gastos</h4>
            </div>

            {
                values.map((element, index) => {
                    return (
                        <div key={index} className='flex items-center gap-4 bg-white'>
                            <div className='h-16 max-h- w-1 bg-[#FF4747]' />
                            <p className='font-bold text-lg'>R$ {element.amount}</p>
                            <p>{element.description}</p>
                        </div>
                    )
                })
            }

            <button onClick={subCash} className="flex justify-start items-center gap-4">
                <PlusCircle color="#333" size={16} />
                <h4 className="font-normal">Adicionar</h4>
            </button>
        </div>
    )
}