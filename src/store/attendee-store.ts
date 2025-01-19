import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type AttendeeStoreProps = {
  id: string
  code: string
  name: string
  email: string
  total: number
}

interface StateProps {
  data: AttendeeStoreProps | null 
  save: (data: AttendeeStoreProps) => void
  update: (data: AttendeeStoreProps) => void
  remove: () => void
}

export const useAttendeeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,

      save: (data: AttendeeStoreProps) => set(() => ({ data })),

      update: (data: AttendeeStoreProps) => set(() => ({ data: data })),

      remove: () => set(() => ({ data: null })),
    }), {
      name: 'nlw-unite:attendee',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)