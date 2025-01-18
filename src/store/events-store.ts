import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type EventStoreType = {
  id: string,
  slug: string,
  title: string,
  details: string,
  startDate: Date,
  endDate: Date,
  checkIn: boolean,
}

interface StateProps {
  data: EventStoreType[] | []
  save: (data: EventStoreType[]) => void
  update: (data: EventStoreType[]) => void
  remove: () => void
}

export const useEventsStore = create(
  persist<StateProps>(
    (set) => ({
      data: [],

      save: (data: EventStoreType[]) => set(() => ({ data })),

      update: (data: EventStoreType[]) => set(() => ({ data: data })),
      
      remove: () => set(() => ({ data: [] }))
    }), {
      name: 'nlw-unite:events',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
