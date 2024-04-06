import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'
import { Link, Redirect } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert('Ingresso', 'Informe o código do ingresso!')
      }

      setIsLoading(true)

      const { data } = await api.get(`/attendees/${code}/badge`)

      badgeStore.save(data.badge)
    } catch (error) {
      console.log(error)

      setIsLoading(false)

      Alert.alert('Ingresso', 'Ingresso não encontrado!')
    }
  }

  if (badgeStore.data?.checkInUrl) {
    return <Redirect href="/ticket" />
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
            placeholder="Código do ingresso"
            onChangeText={setCode}
            value={code}
          />
        </Input>

        <Button 
          onPress={handleAccessCredential} 
          title="Acessar credencial"
          isLoading={isLoading}
        />

        <Link href="/register" className="text-gray-100 text-base font-bold text-center mt-8">
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}