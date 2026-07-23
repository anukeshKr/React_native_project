import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router';

export default function profile() {

  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in")
    } catch (error) {
      console.error("Error signing Out", error)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className='flex-1 p-5'>
        <Text className='flex-1'>profile</Text>
        <TouchableOpacity
        onPress={handleSignOut}
        className='px-4 py-3 mt-3 bg-blue-600'
        >
          <Text className='text-center font-bold text-white'>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}