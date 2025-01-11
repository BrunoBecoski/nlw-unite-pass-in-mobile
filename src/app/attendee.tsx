import { useState } from 'react'
import { Redirect, router } from 'expo-router'
import { Alert, FlatList, Image, StatusBar, Text, View } from 'react-native'
import axios from 'axios'

import { api } from '@/server/api'
import { EventAttendeeType, useAttendeeStore } from '@/store/attendee-store'
import { Header } from '@/components/header'
import { EventAttendee } from '@/components/eventAttendee'
import { Button } from '@/components/button'

export default function Attendee() {
  const attendeeStore = useAttendeeStore()

  const [events, setEvents] = useState<EventAttendeeType[]>(attendeeStore.data ? attendeeStore.data.events : [])
  const [total, setTotal] = useState(attendeeStore.data ? attendeeStore.data.total : 0)
  const [index, setIndex] = useState(1)

  if (attendeeStore.data == null) {
    return <Redirect href="/" />
  }

  const {
    id,
    code,
    name,
    email,
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

  async function fetchEventsIndex() {
    const newIndex = index + 1

    const { data } = await api.get(`/get/attendee/${code}?pageIndex=${newIndex}`)
    
    const newEvents = [...events, ...data.attendee.events]
    
    setIndex(newIndex)
    setEvents(newEvents)
  }

  function handleCheckIn(event: EventAttendeeType) {
    Alert.alert('Fazer Check-in', `Deseja fazer o check-in no evento ${event.title}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Check-in',
        onPress: () => fetchCheckIn(event),
      }
    ])
  }

  async function fetchCheckIn(event: EventAttendeeType) {
    try {
      await api.get(`/check-in/event/${event.id}/attendee/${id}`)

      const { data } = await api.get(`/get/attendee/${code}`)
      attendeeStore.update(data.attendee)
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message)) {
          return Alert.alert('Check-in', error.response?.data.message)
        }
      }

      Alert.alert('Check-in', 'Não foi possível fazer o check-in no evento!')
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha conta" handleExit={handleExit} />

      <View className="items-center py-4">
        <Text className="text-zinc-50 text-lg font-bold mb-4">Código #{code}</Text>

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

      <Text className="text-zinc-50 text-2xl font-semibold text-center mb-6">Participando de {total} eventos</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventAttendee event={item} handleCheckIn={handleCheckIn} />
        )}
        ListHeaderComponent={
          <Button title="Buscar novos eventos" onPress={() => router.navigate('/events')} />
        }
        ListHeaderComponentClassName="items-center"
        ListFooterComponent={
          <Button 
            title="Mostrar mais eventos"
            onPress={fetchEventsIndex}
          />
        }
        ListFooterComponentClassName={ Math.ceil(total / 10) > index ? 'm-10' : 'hidden' }
      />
    </View>
  )
}