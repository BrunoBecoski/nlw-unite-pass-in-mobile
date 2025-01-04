import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'w-full h-14 px-6 bg-orange-500 items-center justify-center rounded-lg disabled:opacity-95',

  variants: {
    size: {
      full: 'w-full',
      auto: 'w-auto',
      flex: 'flex-1',
   },

   disabled: {
    true: 'opacity-50',
    false: 'opacity-100',
   }
  },
  
  defaultVariants: {
    size: 'full',
    disabled: false,
  }
})

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof button> {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, size, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View className={button({ size, disabled: isLoading })}>
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
