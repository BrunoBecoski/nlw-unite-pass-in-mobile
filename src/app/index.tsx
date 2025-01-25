import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'
import { Link, Redirect, router } from 'expo-router'

import { api } from '@/server/api'
import { useAttendeeStore } from '@/store/attendee-store'
import { useEventsStore } from '@/store/events-store'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const attendeeStore = useAttendeeStore()
  const eventStore = useEventsStore()

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert('Ingresso', 'Informe o código do ingresso!')
      }

      setIsLoading(true)

      const attendeeData = await api.get(`/get/attendee/${code}`)
      attendeeStore.save(attendeeData.data.attendee)

      const eventsData = await api.get(`/get/attendee/${code}/events`)
      eventStore.save(eventsData.data.events)
    } catch (error) {
      console.log(error)

      setIsLoading(false)

      Alert.alert('Participante', 'Participante não encontrado!')
    }
  }

  if (attendeeStore.data) {
    return <Redirect href="/attendee" />
  }

  return (
    <View className="bg-green-900 flex-1 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image 
        className="h-16"
        source={require('@/assets/logo.png')}
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <Icon
            name="confirmation-num"
            size={20}
            color="green"
          />
          <Input.Field 
            placeholder="Seu código de participante"
            onChangeText={setCode}
            value={code}
            keyboardType='numeric'
          />
        </Input>

        <Button onPress={handleAccessCredential} isLoading={isLoading}>
          <Button.Icon icon="login" />
          <Button.Title title="Acessar conta" />
        </Button>

        <Link href="/register" className="text-gray-100 text-base font-bold text-center mt-8">
          Ainda não possui conta?
        </Link>
      </View>
    </View>
  )
}