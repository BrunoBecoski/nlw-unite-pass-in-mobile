import { Redirect } from 'expo-router'
import { Text, View } from 'react-native'

import { useAttendeeStore } from '@/store/attendee-store'
import { Button } from '@/components/button'

export default function Attendee() {
  const { data, remove } = useAttendeeStore();

  if (data == null) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 items-center justify-center ">
      <Text>{data.name}</Text>
      <Button onPress={remove} title="Sair" />
    </View>
  )
}