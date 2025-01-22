import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { MaterialIconsTypes } from '../../@types/MaterialIcons';
import { colors } from '@/styles/colors';

const button = tv({
  variants: {
    variant: {
      default: 'w-full h-14 px-6 bg-orange-500 items-center justify-center rounded-lg disabled:opacity-95',
      icon: ''
    },

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
    variant: 'default',
    size: 'full',
    disabled: false,
  }
})

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof button> {
  title?: string;
  icon?: MaterialIconsTypes 
  isLoading?: boolean;
}

export function Button({ title, size, icon, variant = 'default', isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View className={button({ variant, size, disabled: isLoading })}>
        {isLoading 
          ?
            <ActivityIndicator
              className="text-green-500"
            />
          :
            variant === 'default' 
              ?
                <Text className="text-green-500 text-base font-bold uppercase">
                  {title}
                </Text>
              : 
                <MaterialIcons name={icon} size={32} color={colors.red[500]} />
          }
        </View>
      </TouchableOpacity>
  )
}
