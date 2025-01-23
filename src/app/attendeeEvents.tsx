import { Alert, FlatList, StatusBar, Text, View } from 'react-native'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

import { api } from '@/server/api'
import { EventStoreType, useEventsStore } from '@/store/events-store'
import { useAttendeeStore } from '@/store/attendee-store'
import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { colors } from '@/styles/colors'

export default function AttendeeEvents() {
  const eventsStore = useEventsStore()
  const attendeeStore = useAttendeeStore()
  
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
      await api.delete(`/delete/event/${event.slug}/attendee/${attendeeStore.data?.code}`)
    } catch (error) {
      console.log(error)
      Alert.alert('Sair do evento', 'Não foi possível sair do evento.')
    }
  }
  

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Meus Eventos" back />

      <View className="items-center mb-6">
        <Button title="Buscar novos eventos"  onPress={() => router.navigate('/events')} />
      </View>

      <FlatList
        data={eventsStore.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="my-6 px-6">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="font-bold text-2xl text-orange-500">{item.title}</Text>
                <Text className="text-gray-200">{item.slug}</Text>
              </View>

              <Button icon="delete" variant="icon" onPress={() => handleExitEvent(item)} />
            </View>

            <Text className="text-zinc-100 text-lg my-4">{item.details}</Text>

            <View className="flex-row justify-between items-center mb-4">
              <Button
                title="Ver tíquete"
                onPress={() => router.navigate(`/ticket/${item.slug}`)}
              >
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={24}
                  color={colors.green[200]}
                />
              </Button>
        
              <View className="flex-row items-center">
                <Text className="text-zinc-300 italic font-black text-xl">
                  {dayjs(item.startDate).format('DD/MM/YY')}
                </Text>

                <Text className="font-bold text-2xl text-orange-500"> {'-'} </Text>

                <Text className="text-zinc-300 italic font-black text-lg">
                  {dayjs(item.endDate).format('DD/MM/YY')}
                </Text>
              </View>
            </View>
          </View>
        )}

        ListHeaderComponent={
          <Text className="text-zinc-50 text-3xl font-bold ml-6">Meus eventos: {eventsStore.data.length}</Text>
        }
      />
    </View>
  )
}