import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Colors from '../../../lib/colors.json'
import React from 'react';

// import { Container } from './styles';
interface Props{
search: string,
setSearch: (value:string)=> void;
onClick: ()=> void;
}
const SearchComponent = ({search,setSearch, onClick}: Props) => {
  return (
    <div className="my-4 w-[50%] max-md:w-full flex items-center gap-4">
    <Input
      placeholder="Buscar..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <Button
      size={"icon"}
      className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300`}
   onClick={onClick}
   >
      <Search />
    </Button>
  </div>
  )
}

export default SearchComponent;