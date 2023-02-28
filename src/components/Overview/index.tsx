import { OverviewProps } from '@/utils';
import { Eye, Calendar } from 'lucide-react';

export const Overview = ({ date, economies, expenses }: OverviewProps) => {
    return (
        <div className='w-full xl:max-w-md lg:max-w-[280px] mx-w-xl pb-6'>
            <div className="flex justify-start items-center gap-4 pb-6">
                <Eye color="#333" size={16} />
                <h4 className="font-bold text-lg">Visão Geral</h4>
            </div>
            <div className="flex flex-col gap-4 bg-white p-6">

                <div className='flex flex-col gap-4'>

                    <h4 className='font-bold text-lg'> Dados de Fevereiro </h4>

                    <button className="flex justify-center items-center gap-4 bg-[#F1F5F8] px-6 py-2">
                        <h4 className="font-bold text-md text-[#666]">24 / 02 / 2023</h4>
                        <Calendar color="#666" size={16} />
                    </button>

                    <div className='flex items-center gap-4 bg-white'>
                        <div className='h-12 max-h- w-1 bg-[#5DE950]' />

                        <div>
                            <p>Economia Total</p>
                            <p className='font-bold xl:text-2xl text-lg'>R$ 2.000,00</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 bg-white'>
                        <div className='h-12 max-h- w-1 bg-[#FF4747]' />

                        <div>
                            <p>Gasto Total</p>
                            <p className='font-bold xl:text-2xl text-lg'>R$ 2.000,00</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}