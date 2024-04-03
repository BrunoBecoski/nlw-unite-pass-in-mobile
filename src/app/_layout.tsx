import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Loading } from '@/components/loading';
import '@/styles/global.css'


export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  return (
    <>
      <StatusBar style="light" />
      {fontsLoaded ? <Slot /> :<Loading />}
    </>
  )
}
