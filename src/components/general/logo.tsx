import { BanknotesIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/general/fonts';

export default function Logo() {
  return (
    <div className={`${lusitana.className} leading-none items-center justify-center text-white`}>
      <BanknotesIcon className="w-14 rotate-[15deg]" />
      <span className="text-[34px]">Tandem</span>
    </div>
  );
}


