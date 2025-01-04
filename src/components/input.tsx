import { ReactNode } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

import { colors } from '@/styles/colors'

const input = tv({
  base: 'w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg',

  variants: { 
    size: {
      full: 'w-full',
      auto: 'w-auto',
      flex: 'flex-1',
    },
  },

  defaultVariants: {
    size: 'full'
  }
})

interface InputProps extends VariantProps<typeof input> {
  children: ReactNode;
}

function Input({ children, size }: InputProps) {
  return (
    <View className={input({ size })}>
      {children}
    </View>
  )
}

interface FieldProps extends TextInputProps {}

function Field({ ...props }: FieldProps) {
  return (
    <TextInput 
      className="flex-1 text-white text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...props}
    />
  )
}

Input.Field = Field

export { Input }