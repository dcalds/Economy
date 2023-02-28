import { CardProps } from '@/utils';

export const Card = ({ label, value, color }: CardProps) => {
    return (
        <div className="w-full xl:max-w-xs lg:max-w-[200px] md:max-w-[330px] flex flex-col justify-between items-center shadow-lg">
            <div className={'h-1 w-full ' + color}></div>
            <p className='font-normal pt-6 pb-2'>{label}</p>
            <h1 className='font-bold xl:text-2xl md:text-lg pb-6'>{value}</h1>
        </div>
    )
}