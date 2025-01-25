import { Redirect, router } from 'expo-router'
import { Alert, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { useAttendeeStore } from '@/store/attendee-store'
import { useEventsStore } from '@/store/events-store'
import { useAvatarStore } from '@/store/avatar-store'
import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

export default function Attendee() {
  const attendeeStore = useAttendeeStore()
  const eventsStore = useEventsStore()
  const avatarStore = useAvatarStore()

  if (attendeeStore.data == null) {
    return <Redirect href="/" />
  }

  const {
    code,
    name,
    email,
  } = attendeeStore.data

  const avatar = avatarStore.data

  function handleExit() {
    Alert.alert('Sair da conta', `Deseja sair da conta ${name}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: logout,
      }
    ])
  }

  function logout() {
    attendeeStore.remove()
    eventsStore.remove()
    avatarStore.remove()

    router.push('/')
  }

  async function handleSelectAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4]
      })

      if (result.assets) {
        avatarStore.save(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
    }
  }

  return (
    <View className="flex-1 bg-green-900">
      <StatusBar barStyle="light-content" />

      <Header title="Minha conta" handleExit={handleExit} />

      <View className="items-center py-4">
        <Text className="text-zinc-50 text-lg font-bold mb-4">Código #{code}</Text>

        { avatar
          ?
            <TouchableOpacity activeOpacity={0.9} onPress={handleSelectAvatar}>
              <View>
                <Image
                  className="w-36 h-36 rounded-full"
                  source={{ uri: avatar, cache: 'reload' }}
                />

              </View>
            </TouchableOpacity>
          :
            <TouchableOpacity activeOpacity={0.9} onPress={handleSelectAvatar}>
              <View className="w-36 h-36 rounded-full bg-gray-200 items-center justify-center">
                <Icon name="camera-alt" color="black" size={32} />
              </View>
            </TouchableOpacity>
        }

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {email}
        </Text>
      </View>

      <Button title="Ver meus eventos" onPress={() => router.push('/attendeeEvents')} />
    </View>
  )
}