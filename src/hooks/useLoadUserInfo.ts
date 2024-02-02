import { getUserInfo } from '@/services/user';
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react';

function useLoadUserInfo() {
  const [loading, setLoading] = useState(true);
  const resetUser = useUserStore(state => state.resetUser);

  useEffect(() => {
    async function get() {
      const user = await getUserInfo();
      // 存储到 store
      resetUser(user);
      setLoading(false);
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
}

export default useLoadUserInfo;
