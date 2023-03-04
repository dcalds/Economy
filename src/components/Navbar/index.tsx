import { LogOut, Settings } from 'lucide-react';
import { NavbarProps } from '@/utils';

export const Navbar = ({ data, openSettings, logOut, hasData, isLoading }: NavbarProps) => {
    return (
        <nav className="h-20 flex justify-between items-center shadow-lg relative">

            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex gap-3 justify-center items-center'>
                    <div className="h-8 w-8 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${data?.image})` }}></div>
                    <div>
                        <p className='font-semibold text-sm sm:block hidden'>{data?.name}</p>
                        <p className='font-normal text-slate-500 text-xs sm:block hidden'>{data?.email}</p>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-8'>

                    {hasData && (
                        <button onClick={openSettings} className='flex gap-2 justify-center items-center'>
                            <Settings color='#333' size={20} />
                        </button>
                    )}

                    <button onClick={logOut} className='flex gap-2 justify-center items-center'>
                        <LogOut color='#FF4747' size={16} />
                        <p className='text-[#FF4747] font-semibold sm:block hidden'>Sair</p>
                    </button>
                </div>
            </div>

            {isLoading && (
                <section className="container fixed mx-auto flex justify-center top-0 left-0">
                    <div className="h-1 w-full bg-green-500 animate-ping"></div>
                </section>
            )}

        </nav>
    )
}