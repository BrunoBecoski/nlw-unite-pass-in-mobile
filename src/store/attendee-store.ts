import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface AttendeeStoreProps {
  id: string
  code: string
  name: string
  email: string
  events: {
    id: string,
    slug: string,
    title: string,
    details: string,
    startDate: Date,
    endDate: Date,
    checkIn: boolean,
  }[]      
  total: number,
}

interface StateProps {
  data: AttendeeStoreProps | null 
  save: (data: AttendeeStoreProps) => void
  remove: () => void
}

export const useAttendeeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,

      save: (data: AttendeeStoreProps) => set(() => ({ data })),

      remove: () => set(() => ({ data: null })),
    }), {
      name: 'nlw-unite:attendee',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)