import { Redirect, router } from 'expo-router'
import { Alert, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { useAttendeeStore } from '@/store/attendee-store'
import { useEventsStore } from '@/store/events-store'
import { Header } from '@/components/header'
import { EventAttendee } from '@/components/eventAttendee'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

export default function Attendee() {
  const attendeeStore = useAttendeeStore()
  const eventsStore = useEventsStore()

  if (attendeeStore.data == null) {
    return <Redirect href="/" />
  }

  const {
    code,
    name,
    email,
    image,
  } = attendeeStore.data

  function handleExit() {
    Alert.alert('Sair da conta', `Sair da conta ${name}`, [
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
        attendeeStore.updateAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha conta" handleExit={handleExit} />

      <View className="items-center py-4">
        <Text className="text-zinc-50 text-lg font-bold mb-4">Código #{code}</Text>

        { image
          ?
            <TouchableOpacity activeOpacity={0.9} onPress={handleSelectAvatar}>
              <View>
                <Image
                  className="w-36 h-36 rounded-full"
                  source={{ uri: image }}
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
          <EventAttendee event={item} />
        )}
        ListHeaderComponent={
          <Text className="text-zinc-50 text-3xl font-bold ml-6">Meus eventos: {eventsStore.data.length}</Text>
        }
      />
    </View>
  )
}