import {Switch as RNSwitch, Text, View } from 'react-native';

import { colors } from '@/styles/colors'

interface SwitchProps {
  label: string
  value: boolean
  onValueChange: (value : boolean) => void
}

export function Switch({ label, value, onValueChange } : SwitchProps) {
  return (
    <View className="flex-row items-center ">
      <Text className="text-gray-200">{label}</Text>

      <RNSwitch 
        trackColor={{ true: colors.green[500], false: colors.orange[500] }}
        thumbColor={value ? colors.green[500] : colors.orange[500]}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  )
}