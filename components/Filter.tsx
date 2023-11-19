"use client"

import { options } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useDebouncedCallback } from 'use-debounce';



const customStyles = {
  option: (provided:any, state:any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ffffff' : provided.backgroundColor,
    color: state.isSelected ? '#000000' : provided.color,
  }),
};


const options:options[] = [
    { theValue: '', label: 'All products' },
    { theValue: 'Plant Pots', label: 'Plant Pots' },
    { theValue: 'chairs', label: 'chairs' },
    { theValue: 'Tables', label: 'Tables' },
    { theValue: 'Tableware', label: 'Tableware' },
    { theValue: 'Cutlery', label: 'Cutlery' },
    { theValue: 'crockery', label: 'crockery' },
]
  
const sorting : options[]= [
    { theValue: 'createdAt', label: 'time created' },
    { theValue: 'price', label: 'price' },
    { theValue: 'amount', label: 'in stock' }
  ]


const Filter = ({ searchParams }: any) => {
  const router = useRouter()

  const [search, setSearch] = useState<string>('');
  const [isSearchable, setIsSearchable] = useState(true);


  useEffect(() => {
    setSearch(searchParams?.search)
  }, [searchParams?.search])
  
  //FLITER PRODUCT BY TYPE
  const handleSelectChange = useDebouncedCallback((selectedOpt: any) => {
    router.push(`?filter=${selectedOpt.theValue}&sort=${searchParams?.sort}&search=${searchParams?.search}&page=1`, { scroll: false })
  }, 300);


  //SORT PRODUCTS
  const handleSortChange = useDebouncedCallback((selectedOpt: any) => {
    router.push(`?filter=${searchParams?.filter}&sort=${selectedOpt.theValue}&search=${searchParams?.search}&page=1`, { scroll: false })
  }, 300);


  //SEARCH FOR PRODUCT
  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    router.push(`?filter=${searchParams?.filter}&sort=${searchParams?.sort}&search=${e.target.value}&page=1`, { scroll: false })
  }, 300)
 
    
  return (
    <div className='flex flex-col justify-between items-center gap-3 p-3'>
      <div className='flex flex-row justify-between items-center gap-3 p-3'>
                
        <div className='flex flex-row justify-between items-center gap-3 p-3'>
          <h6 className=' hidden md:block'>products</h6>
          <Select
            styles={customStyles}
            options={options}
            blurInputOnSelect={true}
            autoFocus={true}
            onChange={handleSelectChange}
          />
                
        </div>
        <div className='flex flex-row justify-between items-center gap-3 p-3'>
          <h6 className=' hidden md:block'>sorting by</h6>
          <Select
            styles={customStyles}
            options={sorting}
            onChange={handleSortChange}
            isSearchable={isSearchable}
          />
                
        </div>
      </div>
      <input
        onChange={handleSearch}
        defaultValue={searchParams?.search}
        //value={search}
        type="search"
        placeholder='search for products'
        className=' outline-none bg-slate-300 p-2 rounded text-center mx-auto'
      />
    </div>
  );
};

export default Filter