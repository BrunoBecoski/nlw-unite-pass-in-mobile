import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { QRCode } from '@/components/qrcode'
import { colors } from '@/styles/colors'

interface CredentialProps {
  image?: string
  onChangeAvatar?: () => void
  onExpandQRCode?: () => void
}

export function Credential({ image, onChangeAvatar, onExpandQRCode }: CredentialProps) {
  return (
    <View className="w-full self-stretch items-center">
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
            <Text className="text-zinc-50 text-sm font-bold">Unite summit</Text>
            <Text className="text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {image 
          ?
            <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.9}>
              <View>
                <Image
                  className="w-36 h-36 rounded-full -mt-24"
                  source={{ uri: image}}
                  />
                </View>
            </TouchableOpacity>
          :
            <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.9}>
              <View className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center">
                <Feather className="" name="camera" color={colors.green[400]} size={32} />
              </View>
            </TouchableOpacity>
        }

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          Bruno Becoski
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">
          bruno@email.com
        </Text>

        <QRCode
          value='teste'
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
    </View>
  )
}