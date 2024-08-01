import { Loader } from 'lucide-react';
interface TextProps{
    textLoad: string;
}
const LoaderModal = ({textLoad}: TextProps) => {
    return ( 
        <div className='flex items-center gap-1 justify-center'>
            <Loader className='animate-spin'/>
            <p> {textLoad}</p>
        </div>
     );
}
 
export default LoaderModal;