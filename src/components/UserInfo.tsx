import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";

const UserInfo = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className='bg-muted'>
        <div className='flex items-center gap-2 p-2 rounded-xl cursor-pointer'>
          <Avatar className='w-10 h-10 border-emerald-500 border-2'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          </Avatar>
          <p>Peter Baranec</p>
          <ChevronDown className='w-4 h-4' />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='mt-1 p-0 border-none rounded-xl'>
        <DropdownMenuLabel className='flex items-center gap-2 p-4 bg-linear-to-r from-emerald-500 to-blue-500'>
          <Avatar className='w-11 h-11 border-white border-2'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          </Avatar>
          <div className='flex flex-col leading-tight'>
            <p className='text-sm font-medium text-white'>Peter Baranec</p>
            <p className='text-xs text-white'>baranec.dev@gmail.com</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem className='flex gap-2 py-2 px-4 bg-muted cursor-pointer'>
          <LogOut className='w-4 h-4 text-foreground' />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
