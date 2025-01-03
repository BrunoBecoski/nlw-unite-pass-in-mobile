import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

interface HeaderProps {
  title: string
  handleExit?: () => void
}

export function Header({ title, handleExit }: HeaderProps) {
  return (
    <View className="w-full h-28 flex-row items-end bg-black/20 px-8 pb-4 border-b border-white/10">

      { handleExit && <View className="w-7" /> }

      <Text className="flex-1 text-white font-medium text-lg text-center">
        {title}
      </Text>
      
      { handleExit &&
        <TouchableOpacity onPress={handleExit}>
          <MaterialCommunityIcons
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