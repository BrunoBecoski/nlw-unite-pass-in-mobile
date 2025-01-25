import { Image, ImageBackground, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { MotiView } from 'moti'

import { AttendeeStoreProps } from '@/store/attendee-store'
import { EventStoreType } from '@/store/events-store'
import { QRCode } from '@/components/qrcode'
import { Icon } from './icon'

interface CredentialProps {
  attendee: AttendeeStoreProps
  event: EventStoreType
  avatar: string | null
  checkInUrl: string
  onChangeAvatar?: () => void
  onExpandQRCode?: () => void
}

export function Credential({ attendee, event, avatar, checkInUrl, onChangeAvatar, onExpandQRCode }: CredentialProps) {
  const { height } = useWindowDimensions()

  return (
    <MotiView
      className="w-full self-stretch items-center"
      from={{ 
        opacity: 0,
        translateY: -height,
        rotateZ: '50deg',
        rotateY: '30deg',
        rotateX: '30deg',

      }}
      animate={{ 
        opacity: 1, 
        translateY: 0,
        rotateZ: '0deg',
        rotateY: '0deg',
        rotateX: '0deg',
      }}
      transition={{
        type: 'spring',
        damping: 20,
        rotateZ: {
          damping: 15,
          mass: 3,
        }
      }}
    >
      <Image 
        className="w-24 h-52 z-10"
        source={require('@/assets/ticket/band.png')}
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
          source={require('@/assets/ticket/header.png')}
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">{event.title}</Text>
            <Text className="text-zinc-50 text-sm font-bold">#{attendee.code}</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {avatar 
          ?
            <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.9}>
              <View>
                <Image
                  className="w-36 h-36 rounded-full -mt-24"
                  source={{ uri: avatar }}
                />
              </View>
            </TouchableOpacity>
          :
            <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.9}>
              <View className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center">
                <Icon name="camera-alt" color="black" size={32} />
              </View>
            </TouchableOpacity>
        }

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {attendee.name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          {attendee.email}
        </Text>

        <QRCode
          value={checkInUrl}
          size={120}
        />

        <TouchableOpacity 
          onPress={onExpandQRCode}
          activeOpacity={0.7}
        >
          <View className="mt-6">
            <Text className="font-body text-orange-500 text-sm">
              Ampliar QRCode
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </MotiView>
  )
}