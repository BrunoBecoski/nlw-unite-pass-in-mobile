import { useState } from 'react'
import { Alert, Image, StatusBar, View } from 'react-native'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'

import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

const EVENT_ID = 'cb9108f2-8d99-4d30-bfa1-bb6e3bb41da0'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos!')
      }
      
      setIsLoading(true)
  
      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      })

      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api
          .get(`/attendees/${registerResponse.data.attendeeId}/badge`)

          badgeStore.save(badgeResponse.data.badge)

        Alert.alert('Inscrição', 'Inscrição realizado com sucesso!',[
          {
            text: 'OK',
            onPress: () => router.push('/ticket')
          }
        ])
      }

    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message).includes('already registered')) {
          return Alert.alert('Inscrição', 'Este-email já está cadastrado!')
        }
      }

      Alert.alert('Inscrição', 'Não foi possível fazer a inscrição!')
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field onChangeText={setName} placeholder="Nome completo" />
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
          title="Realizar inscrição"
          isLoading={isLoading}
        />

        <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}