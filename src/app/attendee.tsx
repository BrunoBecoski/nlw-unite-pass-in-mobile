import { Redirect, router } from 'expo-router'
import { Alert, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { api } from '@/server/api'
import { useAttendeeStore } from '@/store/attendee-store'
import { EventStoreType, useEventsStore } from '@/store/events-store'
import { useAvatarStore } from '@/store/avatar-store'
import { Header } from '@/components/header'
import { EventAttendee } from '@/components/eventAttendee'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

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

  function handleExitEvent(event: EventStoreType) {
    Alert.alert('Sair do evento', `Deseja sair do evento ${event.title}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => removeEvent(event),
      }
    ])
  }

  async function removeEvent(event: EventStoreType) {
    try {
      await api.delete(`/delete/event/${event.slug}/attendee/${code}`)
    } catch (error) {
      console.log(error)
      Alert.alert('Sair do evento', 'Não foi possível sair do evento.')
    }
  }

  return (
    <View className="flex-1 bg-green-500">
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
              <View className="w-36 h-36 rounded-full bg-gray-400 items-center justify-center">
                <MaterialIcons
                  name="camera-alt"
                  color={colors.green[400]}
                  size={32}
                />
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

      <View className="items-center mb-6">
        <Button title="Buscar novos eventos"  onPress={() => router.navigate('/events')} />
      </View>

      <FlatList
        data={eventsStore.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventAttendee event={item} exitEvent={() => handleExitEvent(item)}/>
        )}
        ListHeaderComponent={
          <Text className="text-zinc-50 text-3xl font-bold ml-6">Meus eventos: {eventsStore.data.length}</Text>
        }
      />
    </View>
  )
}