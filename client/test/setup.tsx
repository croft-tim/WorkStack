import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react/pure'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import routes from '../routes'

beforeEach(cleanup)
expect.extend(matchers)

export function renderRoute(location: string) {
  const user = userEvent.setup()

  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { user, ...screen }
}
