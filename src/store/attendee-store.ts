import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type AttendeeStoreProps = {
  id: string
  code: string
  name: string
  email: string
  total: number
  image?: string
}

interface StateProps {
  data: AttendeeStoreProps | null 
  save: (data: AttendeeStoreProps) => void
  update: (data: AttendeeStoreProps) => void
  updateAvatar: (uri: string) => void
  remove: () => void
}

export const useAttendeeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,

      save: (data: AttendeeStoreProps) => set(() => ({ data })),

      update: (data: AttendeeStoreProps) => set(() => ({ data: data })),

      updateAvatar: (uri: string) => 
        set((state) => ({
          data: state.data 
            ? { ...state.data, image: uri }
            : state.data
        })),

      remove: () => set(() => ({ data: null })),
    }), {
      name: 'nlw-unite:attendee',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)