import { Image, StatusBar, View } from 'react-native'
import { Link } from 'expo-router'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

export default function Register() {
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
          <Input.Field placeholder="Nome completo" />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field 
            placeholder="E-mail"
            keyboardType="email-address"
          />
        </Input>

        <Button title="Realizar inscrição" />

        <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}