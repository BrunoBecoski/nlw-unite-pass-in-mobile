import { Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

import { Icon } from './icon'

interface HeaderProps {
  title: string
  back?: boolean
  handleExit?: () => void
}

export function Header({ title, back = false, handleExit }: HeaderProps) {
  return (
    <View className="w-full h-28 flex-row items-end bg-black/20 px-8 pb-4 border-b border-white/10">

      { handleExit && <View className="w-7" /> }

      { back &&
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            className="h-12"
            name="arrow-back-ios"
            size={24}
            color="orange"
          />
        </TouchableOpacity>
      }

      <Text className="flex-1 text-white font-medium text-lg text-center">
        {title}
      </Text>

      { back && <View className="w-7" /> }

      { handleExit &&
        <TouchableOpacity onPress={handleExit}>
          <Icon
            className="h-12"
            name="logout"
            size={24}
            color="orange"
          />
        </TouchableOpacity>
      }
    </View>
  )
}