import { View, Text,Image,TextInput, TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import { usePathname,useLocalSearchParams,router} from 'expo-router';
import icons from '@/constants/icons';
import {useDebouncedCallback} from "use-debounce";
const Search = () => {
  const path=usePathname();
  const params=useLocalSearchParams<{query?:string}>();
  const [search,setSearch]=useState(params.query);
  const debouncedSearch=useDebouncedCallback((text:string)=> router.setParams({query:text}),500)
  
  const handleSearch=(text:string)=>{
    setSearch(text);
    debouncedSearch(text);
  }

  
  return (
    <View className='flex flex-row items-center justify-between w-full px-4 py-3 rounded-2xl bg-slate-200 border border-primary-100 mt-5'>
      <View className='flex-1 flex flex-row items-center justify-start z-50'>
        <Image source={icons.search} className='size-5'></Image>
        <TextInput value={search} onChangeText={handleSearch} placeholder="Search for Events" className='text-sm font-nunito text-black-300 ml-2 flex-1'></TextInput>
      </View>
      <TouchableOpacity >
        <Image source={icons.filter} className='size-5'></Image>
      </TouchableOpacity>
    </View>
  )
}

export default Search 