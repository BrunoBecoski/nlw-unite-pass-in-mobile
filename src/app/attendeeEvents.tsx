import { Alert, FlatList, StatusBar, Text, View } from 'react-native'
import { router } from 'expo-router'
import { tv } from 'tailwind-variants'
import dayjs from 'dayjs'

import { api } from '@/server/api'
import { EventStoreType, useEventsStore } from '@/store/events-store'
import { useAttendeeStore } from '@/store/attendee-store'
import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Icon } from '@/components/icon'

const color = tv({
  variants: {
    checkIn: {
      true: 'text-green-300',
      false: 'text-orange-500',
    },
  },
  
  defaultVariants: {
    checkIn: false,
  }
})

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
    <View className="flex-1 bg-green-900">
      <StatusBar barStyle="light-content" />

      <Header title="Meus Eventos" back />

      <View className="items-center mb-6">
        <Button title="Buscar novos eventos"  onPress={() => router.navigate('/events')} />
      </View>

      <FlatList
        data={eventsStore.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { checkIn, title, slug, details, startDate, endDate } = item

          return (
            <View className="my-6 px-6">
              <View className="flex-row items-start justify-between">
                <View >

                  <View className='flex-row items-center gap-2'>
                    <Icon 
                      name={checkIn ? 'check-box' : 'check-box-outline-blank'}
                      color={checkIn ? 'green' : 'orange' }
                      size={24}
                    />
                    <Text className={color({ checkIn: checkIn, className: 'font-bold text-2xl'})}>{title}</Text>
                  </View>
                  <Text className="text-gray-200">{slug}</Text>
                </View>

                <Button icon="delete" variant="icon" color="none" onPress={() => handleExitEvent(item)} />
              </View>

              <Text className="text-zinc-100 text-lg my-4">{details}</Text>

              <View className="flex-row justify-between items-end mb-4">
                <Button
                  title="Ver tíquete"
                  color={checkIn ? 'green' : 'orange' }
                  onPress={() => router.navigate(`/ticket/${slug}`)}
                />
          
                <View className="flex-row items-center">
                  <Text className="text-zinc-300 italic font-black text-xl">
                    {dayjs(startDate).format('DD/MM/YY')}
                  </Text>

                  <Text className={color({ checkIn: checkIn, className: 'font-bold text-2xl' })}> {'-'} </Text>

                  <Text className="text-zinc-300 italic font-black text-lg">
                    {dayjs(endDate).format('DD/MM/YY')}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}

        ListHeaderComponent={
          <Text className="text-zinc-50 text-3xl font-bold ml-6">Meus eventos: {eventsStore.data.length}</Text>
        }
      />
    </View>
  )
}