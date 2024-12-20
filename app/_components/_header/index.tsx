import Image from "next/image";
import { ExternalLinkIcon, Store } from 'lucide-react';
import { PackageCheck } from 'lucide-react';
import { Pizza } from 'lucide-react';
import Link from "next/link";
const Header = () => {
    return ( 
        <div className='w-full flex justify-between px-4 items-center py-2 border-b sticky top-0 bg-white z-50 '>
        <Image
            src={"/pedido-online.png"}
            width={30}
            height={30}
            alt='logo pedido facil'
            className='object-cover'
        />
        <ul className='flex items-center gap-2'>
        <div className="flex items-center gap-1 border-r px-2">
                       <PackageCheck size={24} color='#449cd4' className="max-md:hidden"/>
                       <div className="flex flex-col">
                        <Link href={'/dashboard'}>
                        <li className='cursor-pointer hover:text-[#449cd4]  duration-300 text-sm'>Pedidos</li>
                        </Link>
                       
                         <p className="text-[0.7rem] text-slate-700 max-md:hidden">Monitore seus pedidos</p>
                       </div>
                      
                </div>
     
            
            <div className="flex items-center gap-1 border-r px-2">
                       <Store size={24} color='#449cd4' className="max-md:hidden"/>
                       <div className="flex flex-col">
                        <Link href='/products'>
                        <li className='cursor-pointer hover:text-[#449cd4] duration-300 text-sm'>Cardápio</li>
                        </Link>
                         
                         <p className="text-[0.7rem] text-slate-700 max-md:hidden">Lista e cadastro de produtos</p>
                       </div>
                      
                </div>
                <div className="flex items-center gap-1 px-2">
                       <Pizza size={24} color='#449cd4' className="max-md:hidden"/>
                       <div className="flex flex-col">
                        <Link href={'/categories'}>
                        <li className='cursor-pointer hover:text-[#449cd4] duration-300 text-sm'>Categorias</li>
                        </Link>
                       
                         <p className="text-[0.7rem] text-slate-700 max-md:hidden">Lista e cadastro de categorias</p>
                       </div>
                      
                </div>
                <div className="flex items-center gap-1 px-2">
                  {/**IMPLEMENTAR FUNCAO PARA SAIR  */}
                       <ExternalLinkIcon size={24} color='#449cd4' className="max-md:hidden"/>
                       <div className="flex flex-col">
                        
                        <li className='cursor-pointer hover:text-[#449cd4] duration-300 text-sm'>Sair</li>
                      
                       
                      
                       </div>
                      
                </div>
           
         
            
        </ul>
    </div >
     );
}
 
export default Header;