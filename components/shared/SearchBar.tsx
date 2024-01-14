'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBar = ({ placeholder = 'Nom du thread...' }: { placeholder?: string }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }
      router.push(newUrl, { scroll: false })
    }, 300)
    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])

  return (
    <div className='w-full flex flex-col gap-3'>
      <h2 className='font-semibold text-2xl'>Rechercher :</h2>
      <div className='w-full bg-zinc-800 min-h-[40px] rounded-lg overflow-hidden px-4 py-2 flex items-center justify-between'>
        <Input type='text' placeholder={placeholder} className='focus-visible:ring-0 text-lg' onChange={(e) => setQuery(e.target.value)} />
        <Image src="/assets/icons/search.svg" alt='search' width={24} height={24} />
      </div>
    </div>
  )
}

export default SearchBar