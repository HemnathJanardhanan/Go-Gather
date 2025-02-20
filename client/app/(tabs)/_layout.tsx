import { View, Text,Image } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
import icons from '@/constants/icons'
const TabIcon=({focused,icon,title}:{focused:boolean;icon:any;title:string})=>(
    <View className='flex-1 mt-3 flex flex-col item-center'>
        <Image source={icon} tintColor={focused? '#0061ff':'#666876'} resizeMode='contain' className='size-6'/>
        <Text className={`${focused ? 
        'text-primary-300 font-nunito-medium':'text-black-200 font-nunito'} text-xs w-full text-center mt-1`}>{title}</Text>
    </View>
)
const TabsLayout = () => {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor:'white',
                position:'absolute',
                borderTopColor:'#0061FF1A',
                borderTopWidth:1,
                minHeight:70
            }
        }}
    >
      
      <Tabs.Screen
        name="index"  
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon icon={icons.search} focused={focused} title="Explore"/>
            )

        }}
      />

      <Tabs.Screen
        name="postEvent"
        options={{
            title:'postEvent',
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon icon={icons.plus} focused={focused} title="Post"/>
            )

        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
            title:'Profile',
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon icon={icons.person} focused={focused} title="Profile"/>
            )

        }}
      />
    </Tabs>
  )
}

export default TabsLayout