import Image from 'next/image'
import { LogOut } from 'lucide-react';
import { NavbarProps } from '@/utils';

export const Navbar = ({ user, logOut }: NavbarProps) => {
    return (
        <nav className="h-20 flex justify-between items-center shadow-lg">

            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex gap-2 justify-center items-center'>
                    <Image
                        src="/user.png"
                        alt="User"
                        width={32}
                        height={32}
                        priority
                    />
                    <p className='font-semibold sm:block hidden'>{user}</p>
                </div>

                <button onClick={logOut} className='flex gap-2 justify-center items-center'>
                    <LogOut color='#FF4747' size={16} />
                    <p className='text-[#FF4747] font-semibold'>Sair</p>
                </button>
            </div>

        </nav>
    )
}