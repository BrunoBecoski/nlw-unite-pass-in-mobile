import { Redirect } from 'expo-router'
import { FlatList, StatusBar, Text, View } from 'react-native'

import { useAttendeeStore } from '@/store/attendee-store'
import { Button } from '@/components/button'

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

  return (
  <View className="flex-1 bg-green-500 p-8 ">
    <StatusBar barStyle="light-content" />

      <Text className="text-zinc-50 text-sm font-bold">#{code}</Text>

      <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {name} 
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {email}
        </Text>

        <Text className="text-zinc-50 text-4xl">Eventos</Text>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View> 
              <Text className="text-zinc-50">{item.slug}</Text>
              <Text className="text-zinc-50">{item.title}</Text>
              <Text className="text-zinc-50">{item.details}</Text>
              <Text className="text-zinc-50">{item.startDate.toString()}</Text>
              <Text className="text-zinc-50">{item.endDate.toString()}</Text>
              <Text className="text-zinc-50">{item.checkIn}</Text>
            </View>
          )}
        />
      <Button onPress={attendeeStore.remove} title="Sair" />
    </View>
  )
}