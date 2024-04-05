import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'
import { Link } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

export default function Home() {
  const [code, setCode] = useState('')

  function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert('Ingresso', 'Informe o código do ingresso!')
    }
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

        <Button onPress={handleAccessCredential} title="Acessar credencial" />

        <Link href="/register" className="text-gray-100 text-base font-bold text-center mt-8">
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}