import { User } from '@/types/request/user';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
}

interface UserAction {
  resetUser: (user: User) => void;
}

const useUserStore = create<UserState & UserAction>()(
  devtools(
    persist(
      set => ({
        user: null,
        resetUser: (user: User) => set(() => ({ user: user })),
      }),
      { name: 'userStore' }
    )
  )
);

export default useUserStore;
