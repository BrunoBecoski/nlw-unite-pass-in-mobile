import { Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

import { Icon } from './icon'
import { Button } from './button'

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
        <Button onPress={router.back} variant="icon" color="none" className="h-12">
          <Button.Icon icon="arrow-back-ios" color="orange" size={24} />
        </Button>
      }

      <Text className="flex-1 text-white font-medium text-lg text-center">
        {title}
      </Text>

      { back && <View className="w-7" /> }

      { handleExit &&
        <Button onPress={handleExit} variant="icon" color="none" className="h-12">
          <Button.Icon icon='logout' color="orange" size={24} />
        </Button>
      }
    </View>
  )
}