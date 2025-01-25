import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

import { MaterialIconsTypes } from '../@types/MaterialIcons'
import { Icon } from './icon'

const button = tv({
  variants: {
    variant: {
      default: 'w-full h-14 px-6 items-center justify-center rounded-lg disabled:opacity-95',
      icon: ''
    },

    size: {
      full: 'w-full',
      auto: 'w-auto',
      flex: 'flex-1',
    },

    color: {
      orange: 'bg-orange-500',
      green: 'bg-green-300',
      none: 'bg-none'
    },


    disabled: {
      true: 'opacity-50',
      false: 'opacity-100',
    }
  },
  
  defaultVariants: {
    variant: 'default',
    size: 'full',
    color: 'orange',
    disabled: false,
  }
})

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof button> {
  title?: string;
  icon?: MaterialIconsTypes 
  isLoading?: boolean;
}

export function Button({ title, size, icon, color, variant = 'default', isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View className={button({ variant, size, color, disabled: isLoading })}>
        {isLoading 
          ?
            <ActivityIndicator
              className="text-green-900"
            />
          :
            variant === 'default' 
              ?
                <Text className="text-green-900 text-base font-bold uppercase">
                  {title}
                </Text>
              : 
                icon &&
                <Icon name={icon} size={32} color="red" />
          }
        </View>
      </TouchableOpacity>
  )
}
