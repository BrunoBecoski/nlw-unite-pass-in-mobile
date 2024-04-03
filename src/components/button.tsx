import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View  className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg">
        {isLoading 
          ?
            <ActivityIndicator
              className="text-green-500"
            />
          :
            <Text className="text-green-500 text-base font-bold uppercase">
              {title}
            </Text>
          }
        </View>
      </TouchableOpacity>
  )
}
