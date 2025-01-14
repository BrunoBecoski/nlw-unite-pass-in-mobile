import { useState } from 'react'
import { Redirect, router } from 'expo-router'
import { Alert, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

import { api } from '@/server/api'
import { EventAttendeeType, useAttendeeStore } from '@/store/attendee-store'
import { Header } from '@/components/header'
import { EventAttendee } from '@/components/eventAttendee'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'

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
        onPress: attendeeStore.remove,
      }
    ])
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

  async function fetchEventsIndex() {
    const newIndex = index + 1

    const { data } = await api.get(`/get/attendee/${code}?pageIndex=${newIndex}`)
    
    const newEvents = [...events, ...data.attendee.events]
    
    setIndex(newIndex)
    setEvents(newEvents)
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
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventAttendee event={item} handleCheckIn={handleCheckIn} />
        )}
        ListHeaderComponent={
          <Text className="text-zinc-50 text-3xl font-bold ml-6">Meus eventos: {total}</Text>
        }
        ListHeaderComponentClassName="mt-4"
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