import { LOGIN_PATH } from '@/router';
import { getUserInfo } from '@/services/user';
import useUserStore from '@/store/userStore';
import { getToken } from '@/utils/token';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useLoadUserInfo() {
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const navigate = useNavigate();
  const resetUser = useUserStore(state => state.resetUser);

  useEffect(() => {
    async function get() {
      if (token) {
        const user = await getUserInfo();
        // 存储到 store
        resetUser(user);
      } else {
        navigate(LOGIN_PATH);
      }
      setLoading(false);
    }
    get();
  }, [token]);

  return { loading };
}

export default useLoadUserInfo;
