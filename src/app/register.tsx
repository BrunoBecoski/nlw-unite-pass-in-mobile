import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { api } from '@/server/api'
import { useAttendeeStore } from '@/store/attendee-store'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

const EVENT_ID = 'cb9108f2-8d99-4d30-bfa1-bb6e3bb41da0'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const attendeeStore = useAttendeeStore()

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos!')
      }
      
      setIsLoading(true)
  
      const { data } = await api.post('/create/attendee', {
        name,
        email,
      })

      attendeeStore.save(data.attendee)


      Alert.alert('Criação', 'Contra crida com sucesso!',[
        {
          text: 'OK',
          onPress: () => router.push('/attendee')
        }
      ])

    } catch (error) {
      setIsLoading(false)

      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message).includes('Email está sendo utilizado.')) {
          return Alert.alert('Criação', 'Email está sendo utilizado.')
        }
      }

      Alert.alert('Criação', 'Não foi possível fazer a inscrição!')
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
          <MaterialIcons
            name="account-circle"
            size={20}
            color={colors.green[200]}
          />

          <Input.Field 
            onChangeText={setName}
            placeholder="Nome completo"
          />
        </Input>
 
        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          
          <Input.Field
            onChangeText={setEmail} 
            placeholder="E-mail"
            keyboardType="email-address"
          />
        </Input>

        <Button 
          onPress={handleRegister}
          title="Criar conta"
          isLoading={isLoading}
        />

        <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">
          Já tem conta?
        </Link>
      </View>
    </View>
  )
}