import { User } from '@/types/response/user';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  user: User | null;
}

interface UserAction {
  resetUser: (user: User) => void;
}

const useUserStore = create<UserState & UserAction>()(
  devtools(
    set => ({
      user: null,
      resetUser: (user: User) => set(() => ({ user: user })),
    }),
    { name: 'userStore' }
  )
);

export default useUserStore;
