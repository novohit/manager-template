import { LOGIN_PATH } from '@/router';
import { getUserInfo } from '@/services/user';
import { getToken } from '@/utils/token';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useLoadUserInfo() {
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function get() {
      if (token) {
        const { userId, username, age, email } = await getUserInfo();
        // 存储到 store
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
