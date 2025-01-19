import { useState } from 'react'
import { ScrollView, StatusBar, Text, View, TouchableOpacity, Alert, Modal, Share } from 'react-native'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome } from '@expo/vector-icons'
import { MotiView } from 'moti'
import axios from 'axios'

import { api } from '@/server/api'
import { useAttendeeStore } from '@/store/attendee-store'
import { useEventsStore } from '@/store/events-store'
import { useAvatarStore } from '@/store/avatar-store'
import { Header } from '@/components/header'
import { Credential } from '@/components/credential'
import { colors } from '@/styles/colors'
import { Button } from '@/components/button'
import { QRCode } from '@/components/qrcode'

export default function Ticket() {
  const [expandQRCode, setExpandQRCode] = useState(false)

  const { slug } = useLocalSearchParams<{ slug: string }>()

  const attendeeStore = useAttendeeStore()
  const eventsStore = useEventsStore()
  const avatarStore = useAvatarStore()

  if (attendeeStore.data == null) {
    return <Redirect href="/" />
  }

  const attendee = attendeeStore.data
  const events = eventsStore.data
  
  if (events == null) {
    return <Redirect href="/attendee" />
  }

  const event = events.find((event) => event.slug === slug)

  if (event == undefined) {
    return <Redirect href="/attendee" />
  }

  const checkInUrl = `http://192.168.0.163:3333/check-in/event/${event.id}/attendee/${attendee.id}`

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4]
      })

      if (result.assets) {
        avatarStore.update(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
    }
  }

  function handleCheckIn() {
    Alert.alert('Fazer Check-in', `Deseja fazer o check-in no evento ${event?.title}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Check-in',
        onPress: () => fetchCheckIn(),
      }
    ])
  }

  async function fetchCheckIn() {
    try {
      await api.get(`/check-in/event/${event?.id}/attendee/${attendee?.id}`)

      const { data } = await api.get(`/get/attendee/${attendee?.code}/events`)
      eventsStore.update(data.events)
      
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

      <Header title="Minha Credencial" />

      <ScrollView 
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          attendee={attendee}
          event={event}
          avatar={avatarStore.data}
          checkInUrl={checkInUrl}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() =>  setExpandQRCode(true)}
        />

        <MotiView
          className="self-center my-6"
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4 text-center">
          {event.title}
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6 text-center">
          {event.details}
        </Text>

        <Button 
          title="Fazer Check-in"
          onPress={handleCheckIn}
        />

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <View className="mt-10">
            <Text className="text-base text-white font-bold text-center">
              Voltar
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <QRCode value={checkInUrl} size={300} />

          <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
            <Text className="font-body text-orange-500 text-sm text-center mt-10">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}