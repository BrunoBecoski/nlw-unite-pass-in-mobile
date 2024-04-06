import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface BadgeStoreProps {
  id: string
  name: string
  email: string
  eventTitle: string
  checkInUrl: string
  image?: string
}

interface StateProps {
  data: BadgeStoreProps | null
  save: (data: BadgeStoreProps) => void
  updateAvatar: (uri: string) => void
  remove: () => void
}

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,

      save: (data: BadgeStoreProps) => set(() => ({ data })),

      updateAvatar: (uri: string) => 
        set((state) => ({
          data: state.data 
            ? { ...state.data, image: uri }
            : state.data
        })),

      remove: () => set(() => ({ data: null })),
    }), {
      name: 'nlw-unite:badge',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)