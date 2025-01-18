import { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import axios from 'axios'

import { api } from '@/server/api'
import { useAttendeeStore } from '@/store/attendee-store'
import { useEventsStore } from '@/store/events-store'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { EventEvents } from '@/components/eventEvents'
import { colors } from '@/styles/colors'

export type EventEventsType = {
  id: string,
  slug: string,
  title: string,
  details: string,
  startDate: Date,
  endDate: Date,
  attendees: number
  maximumAttendees: number
}

export default function Events() {
  const [search, setSearch] = useState('')
  const [events, setEvents] = useState<EventEventsType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [index, setIndex] = useState(1)

  const attendeeStore = useAttendeeStore()
  const eventsStore = useEventsStore()

  function handleJoin(event: EventEventsType) {
    Alert.alert('Participar do Evento', `Deseja participar do evento ${event.title}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Participar',
        onPress: () => fetchEventAttendee(event),
      }
    ])
  }

  useEffect(() => {
    fetchEvents() 
  }, [])

  async function fetchEvents() {
    setIsLoading(true)

    const { data } = await api.get('/get/events')

    setEvents(data.events)
    setTotal(data.total)

    setIsLoading(false)
  }

  async function fetchEventsQuery() {
    setIsLoading(true)

    const { data } = await api.get(`/get/events?query=${search}`)

    setIndex(1)
    setEvents(data.events)
    setTotal(data.total)

    setIsLoading(false)
  }

  async function fetchEventsIndex() {
    setIsLoading(true)
    
    const newIndex = index + 1
    
    const { data } = await api.get(`/get/events?pageIndex=${newIndex}`)
    
    const newEvents = [...events, ...data.events]
    
    setIndex(newIndex)
    setEvents(newEvents)

    setIsLoading(false)
  }

  async function fetchEventAttendee(event: EventEventsType) {
    if (attendeeStore.data?.code) {
      try {
        await api.get(`/create/event/${event.slug}/attendee/${attendeeStore.data.code}`)

        const { data } = await api.get(`/get/attendee/${attendeeStore.data?.code}/events`)
        eventsStore.update(data.events)

        router.push('/attendee')

      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (String(error.response?.data.message)) {
            return Alert.alert('Participar', error.response?.data.message)
          }
        }

        Alert.alert('Participar', 'Não foi possível participar do evento!')
      }
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <Header title="Eventos" back />

      <View className="flex flex-row p-6 gap-4">
        <Input
          size='flex'
          >
          <MaterialIcons
            name="search"
            size={20}
            color={colors.green[200]}
            />

          <Input.Field 
            placeholder="Pesquise por um evento"
            onChangeText={setSearch}
            />
        </Input>

        <Button 
          title="Pesquisa"
          size="auto"
          onPress={fetchEventsQuery}
          isLoading={isLoading}
          />
      </View>

      <Text className="text-zinc-300 ml-6 text-lg">{total} evento(s)</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventEvents event={item} handleJoin={handleJoin} />
        )}
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