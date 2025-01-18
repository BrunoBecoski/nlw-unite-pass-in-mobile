import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type EventsStoreProps = {
  id: string,
  slug: string,
  title: string,
  details: string,
  startDate: Date,
  endDate: Date,
  checkIn: boolean,
}[]

interface StateProps {
  data: EventsStoreProps | null
  save: (data: EventsStoreProps) => void
  update: (data: EventsStoreProps) => void
  remove: () => void
}

export const useEventsStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,

      save: (data: EventsStoreProps) => set(() => ({ data })),

      update: (data: EventsStoreProps) => set(() => ({ data: data })),
      
      remove: () => set(() => ({ data: null }))
    }), {
      name: 'nlw-unite:events',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
