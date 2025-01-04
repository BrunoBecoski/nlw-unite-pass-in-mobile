import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { api } from '@/server/api';
import { Header } from '@/components/header';
import { Event } from '@/components/event';

type EventType = {
  id: string,
  slug: string,
  title: string,
  details: string,
  startDate: Date,
  endDate: Date,
  checkIn: boolean,
}

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    fetchEvents() 
  }, [])

  async function fetchEvents() {
    const { data } = await api.get('/get/events')
    
    setEvents(data.events)
  }
  
  return (
    <View className="flex-1 bg-green-500">
      <Header title="Eventos" back />
      <Text>Eventos</Text>

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