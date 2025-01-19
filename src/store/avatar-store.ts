import { create } from "zustand"
import { createJSONStorage ,persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface StateProps {
  data: string | null
  save: (data: string) => void
  update: (data: string) => void
  remove: () => void
}

export const useAvatarStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      
      save: (data: string) => set(() => ({ data })),

      update: (data: string) => set(() => ({ data: data })),

      remove: () => set(() => ({ data: null }))
    }), {
      name: 'nlw-unite:avatar',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)