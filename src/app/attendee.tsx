import { Redirect } from 'expo-router'
import { Alert, FlatList, Image, StatusBar, Text, View } from 'react-native'

import { useAttendeeStore } from '@/store/attendee-store'
import { Header } from '@/components/header';
import { Event } from '@/components/event';

export default function Attendee() {
  const attendeeStore = useAttendeeStore();

  if (attendeeStore.data == null) {
    return <Redirect href="/" />
  }
  const {
    code,
    name,
    email,
    events
  } = attendeeStore.data

  function handleExit() {
    Alert.alert('Sair da conta', `Sair da conta ${name}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: attendeeStore.remove,
      }
    ])
  }

  return (
  <View className="flex-1 bg-green-500">
    <StatusBar barStyle="light-content" />

    <Header title="Minha conta" handleExit={handleExit} />
      <View className="items-center py-4">
        <Text className="text-zinc-50 text-sm font-bold mb-4">#{code}</Text>

        <Image
          className="w-36 h-36 rounded-full"
          source={{ uri: 'https://www.github.com/brunobecoski.png' }}
        />

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {email}
        </Text>
      </View>

      <Text className="text-zinc-50 text-3xl px-4">Meus eventos</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Event event={item} />
        )}
      />
    </View>
  )
}