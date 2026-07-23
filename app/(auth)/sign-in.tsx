import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';

export default function SignIn() {

  const { signIn, errors, fetchStatus } = useSignIn();

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const isLoading = fetchStatus === "fetching"

  const onSingInPress = async () => {
    const { error } = await signIn.password({
      password, emailAddress: email
    })

    if (error) {
      alert(error.message)
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl('/');
          router.replace(url as any)
        }
      });
    } else if (signIn.status === "needs_second_factor") {
      await signIn.mfa.sendPhoneCode();
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(factor => factor.strategy === "email_code");

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete", signIn)
    }

  }

  const onVerifyPress = async () => {
    const result = await signIn.emailCode.verifyCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl('/');
          router.replace(url as any)
        }
      });
    }
  }

  if (signIn.status === "needs_client_trust") {
    return (
      <View className='flex-1 justify-center px-6 py-12'>
        <Image source={require('@/assets/images/logo.png')}
          style={{ width: 128, height: 64 }}
          className="mb-8"
          resizeMode='contain'
        />
        <Text className='text-3xl font-bold text-gray-800 mb-2'>
          Verify your account
        </Text>
        <Text className=' text-gray-500 mb-8'>
          We sent a code to {email}
        </Text>
        <TextInput
          className='border border-gray-300 rounded-xl px-4 mb-3'
          placeholder='Enter verification code'
          placeholderTextColor="#9CA3AF"
          keyboardType='number-pad'
          value={code}
          onChangeText={setCode}
        />

        {errors.fields.code && (
          <Text className='text-red-500 mb-4'>
            {errors.fields.code.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className='w-full bg-blue-600 py-6 rounded-xl items-center mb-4'
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (

            <Text className='text-white font-bold'>Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signIn.mfa.sendEmailCode()}
          className='py-3'
        >
          <Text className='text-blue-600 font-semibold'>I need new code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className='bg-white'
      keyboardShouldPersistTaps="handled"
    >
      <View className='flex-1 justify-center px-6 py-12'>
        <Image source={require('@/assets/images/logo.png')}
          style={{ width: 128, height: 64 }}
          className="mb-8"
          resizeMode='contain'
        />
        <Text className='text-3xl font-bold text-gray-800 mb-2'>
          Welcome Back
        </Text>
        <Text className=' text-gray-500 mb-8'>
          SignIn to your account
        </Text>

        <TextInput
          className='w-full border border-gray-300 rounded-xl px-4 py-3 mb-2'
          placeholder='Email Address'
          placeholderTextColor="#9CA3AF"
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />
        {errors.fields.identifier && (
          <Text className='text-red-500 mb-4'>
            {errors.fields.identifier.message}
          </Text>
        )}

        <TextInput
          className='w-full border border-gray-300 rounded-xl px-4 py-3 mb-2'
          placeholder='password'
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errors.fields.password && (
          <Text className='text-red-500 mb-4'>
            {errors.fields.password.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={onSingInPress}
          disabled={isLoading}
          className='w-full bg-blue-600 py-6 rounded-xl items-center mb-4'
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (

            <Text className='text-white font-bold'>Sign In</Text>
          )}
        </TouchableOpacity>

        <View className='flex-row justify-center'>
          <Text className="text-gray-600">Don't have an account{" "}</Text>
          <Link href={"/(auth)/sign-in"}>
            <Text className="ml-4 text-blue-600 font-semibold">Sign Up</Text>
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  )
}