import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Slot } from 'expo-router'
import "../global.css"
import { StatusBar } from 'expo-status-bar'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style='dark' />
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <Slot />
      </ClerkProvider>
    </>
  )
}