import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export function useTradieLogin() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()

  useEffect(() => {
    const sync = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently()

        await fetch('/api/v1/tradies', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: user.nickname }),
        })
      }
    }
    sync()
  }, [isAuthenticated, user, getAccessTokenSilently])
}
