import { Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

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
          <MaterialIcons
            className="h-12"
            name="arrow-back-ios"
            size={24}
            color={colors.orange[500]}
          />
        </TouchableOpacity>
      }

      <Text className="flex-1 text-white font-medium text-lg text-center">
        {title}
      </Text>

      { back && <View className="w-7" /> }

      { handleExit &&
        <TouchableOpacity onPress={handleExit}>
          <MaterialIcons
            className="h-12"
            name="logout"
            size={24}
            color={colors.orange[500]}
          />
        </TouchableOpacity>
      }
    </View>
  )
}