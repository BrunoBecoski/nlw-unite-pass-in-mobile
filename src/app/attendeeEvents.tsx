import { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { tv } from 'tailwind-variants'
import dayjs from 'dayjs'

import { api } from '@/server/api'
import { EventStoreType, useEventsStore } from '@/store/events-store'
import { useAttendeeStore } from '@/store/attendee-store'
import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { RadioGroup } from '@/components/radioGroup'

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
  
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [events, setEvents] = useState<EventStoreType[]>(eventsStore.data)
  const [filteredEvents, setFilteredEvents] = useState<EventStoreType[]>(events)

  
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
  
  function filterEvents() {
    if (filter === '') {
      setFilteredEvents(eventsStore.data)

      return
    }

    if (filter === 'Com Check-in') {
      setFilteredEvents(events.sort(event => event.checkIn === true ? 1 : -1))

      return
    }

    if (filter === 'Sem Check-in') {
      setFilteredEvents(events.sort(event => event.checkIn === false ? 1 : -1))

      return
    }

    if (filter === 'Mais novo') {
      setFilteredEvents(events.sort((event_1, event_2) => new Date(event_1.startDate).valueOf() - new Date(event_2.startDate).valueOf() ))

      return  
    }

    if (filter === 'Mais antigo') {
      setFilteredEvents(events.sort((event_1, event_2) => new Date(event_2.startDate).valueOf() - new Date(event_1.startDate).valueOf()))

      return
    }
  }

  function handleSearch() {
    const newFilteredEvents = events.filter(event => 
      event.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

    setFilteredEvents(newFilteredEvents)
  }

  useEffect(() => {
    filterEvents()
  }, [filter])

  return (
    <View className="flex-1 bg-green-900">
      <StatusBar barStyle="light-content" />

      <Header title="Meus Eventos" back />


      <View className="flex flex-row p-6 gap-4">
        <Input
          size='flex'
        >
          <Icon
            name="manage-search"
            size={20}
            color="green"
          />

          <Input.Field 
            placeholder="Pesquise por um evento"
            onChangeText={setSearch}
            />
        </Input>

        <Button onPress={handleSearch} size="auto">
          <Button.Icon icon="search" />
        </Button>
      </View>

      <RadioGroup
        values={['Com Check-in', 'Sem Check-in', 'Mais novo', 'Mais antigo']}
        currentValue={filter}
        setCurrentValue={setFilter}
      />

      <FlatList
        data={filteredEvents}
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

                <Button variant="icon" color="none" onPress={() => handleExitEvent(item)}>
                  <Button.Icon icon="delete" color="red" size={24} />
                </Button>
              </View>

              <Text className="text-zinc-100 text-lg my-4">{details}</Text>

              <View className="flex-row justify-between items-end mb-4">
                <Button
                  size="auto"
                  color={checkIn ? 'green' : 'orange' }
                  onPress={() => router.navigate(`/ticket/${slug}`)}
                >
                  <Button.Title title="Ver tíquete" />
                  <Button.Icon icon="confirmation-num" />
                </Button>
          
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
      />
    </View>
  )
}