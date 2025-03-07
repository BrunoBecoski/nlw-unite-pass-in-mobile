import { Redirect, router } from 'expo-router'
import { Alert, FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import dayjs from 'dayjs'

import { useAttendeeStore } from '@/store/attendee-store'
import { useEventsStore } from '@/store/events-store'
import { useAvatarStore } from '@/store/avatar-store'
import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

export default function Attendee() {
  const attendeeStore = useAttendeeStore()
  const eventsStore = useEventsStore()
  const avatarStore = useAvatarStore()

  const events = eventsStore.data.filter((event) => {
    const today = new Date().valueOf()
    const start = new Date(event.startDate).valueOf()
    const end = new Date(event.endDate).valueOf()
    
    if (today >= start && today <= end && event.checkIn === false) {
      return event
    }
  })

  if (attendeeStore.data == null) {
    return <Redirect href="/" />
  }

  const {
    code,
    name,
    email,
  } = attendeeStore.data

  const avatar = avatarStore.data

  function handleExit() {
    Alert.alert('Sair da conta', `Deseja sair da conta ${name}`, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: logout,
      }
    ])
  }

  function logout() {
    attendeeStore.remove()
    eventsStore.remove()
    avatarStore.remove()

    router.push('/')
  }

  async function handleSelectAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4]
      })

      if (result.assets) {
        avatarStore.save(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
    }
  }

  return (
    <View className="flex-1 bg-green-900">
      <StatusBar barStyle="light-content" />

      <Header title="Minha conta" handleExit={handleExit} />

      <View className="items-center py-4">
        <Text className="text-zinc-50 text-lg font-bold mb-4">Código #{code}</Text>

        { avatar
          ?
            <TouchableOpacity activeOpacity={0.9} onPress={handleSelectAvatar}>
              <View>
                <Image
                  className="w-36 h-36 rounded-full"
                  source={{ uri: avatar, cache: 'reload' }}
                />

              </View>
            </TouchableOpacity>
          :
            <TouchableOpacity activeOpacity={0.9} onPress={handleSelectAvatar}>
              <View className="w-36 h-36 rounded-full bg-gray-200 items-center justify-center">
                <Icon name="camera-alt" color="black" size={32} />
              </View>
            </TouchableOpacity>
        }

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {email}
        </Text>

      <Button onPress={() => router.push('/attendeeEvents')} size="auto">
        <Button.Title title="Ver todos os meus eventos" />
        <Button.Icon icon="list" />
      </Button>
      </View>

      <FlatList
        className="h-full"
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { title, slug, details, startDate, endDate } = item

          return (
            <View className="my-6 px-6">
              <View className="flex-row items-start justify-between">
                <View >
                  <View className='flex-row items-center gap-2'>
                    <Icon name="check-box-outline-blank" color="orange" size={24} />
                    <Text className="text-orange-500 font-bold text-2xl">{title}</Text>
                  </View>
                  <Text className="text-gray-200">{slug}</Text>
                </View>
              </View>

              <Text className="text-zinc-100 text-lg my-4">{details}</Text>

              <View className="flex-row justify-between items-end mb-4">
                <Button
                  size="auto"
                  color="orange"
                  onPress={() => router.navigate(`/ticket/${slug}`)}
                >
                  <Button.Title title="Ver tíquete" />
                  <Button.Icon icon="confirmation-num" />
                </Button>
          
                <View className="flex-row items-center">
                  <Text className="text-zinc-300 italic font-black text-xl">
                    {dayjs(startDate).format('DD/MM/YY')}
                  </Text>

                  <Text className="text-orange-500 font-bold text-2xl"> {'-'} </Text>

                  <Text className="text-zinc-300 italic font-black text-lg">
                    {dayjs(endDate).format('DD/MM/YY')}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}
        ListHeaderComponent={
          <Text className="text-zinc-100 font-bold text-2xl text-center">Lista de eventos em andamento </Text>
        }
      />

      <View className="items-center m-6">
        <Button onPress={() => router.navigate('/events')} size='auto'>
          <Button.Title title="Buscar novos eventos" />
          <Button.Icon icon="manage-search" />
        </Button>
      </View>
    </View>
  )
}