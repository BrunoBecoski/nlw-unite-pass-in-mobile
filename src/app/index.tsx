import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'
import { Link, Redirect, router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'
import { useAttendeeStore } from '@/store/attendee-store'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore();
  const attendeeStore = useAttendeeStore();

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert('Ingresso', 'Informe o código do ingresso!')
      }

      setIsLoading(true)

      const { data } = await api.get(`/get/attendee/${code}`)

      attendeeStore.save(data.attendee)
      // badgeStore.save(data.badge)
    } catch (error) {
      console.log(error)

      setIsLoading(false)

      Alert.alert('Participante', 'Participante não encontrado!')
    }
  }

  // if (badgeStore.data?.checkInUrl) {
  //   return <Redirect href="/ticket" />
  // }

  if (attendeeStore.data) {
    return <Redirect href="/attendee" />
  }

  return (
    <View className="bg-green-500 flex-1 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image 
        className="h-16"
        source={require('@/assets/logo.png')}
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons 
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field 
            placeholder="Seu código de participante"
            onChangeText={setCode}
            value={code}
          />
        </Input>

        <Button 
          onPress={handleAccessCredential} 
          title="Acessar conta"
          isLoading={isLoading}
        />

        <Link href="/register" className="text-gray-100 text-base font-bold text-center mt-8">
          Ainda não possui conta?
        </Link>
      </View>
    </View>
  )
}