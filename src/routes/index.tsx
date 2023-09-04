import { Navigate, createBrowserRouter } from 'react-router-dom'

import { paths } from './paths'
import { ProtectedRoute } from '../shared/auth'
import { ContentsPage } from '../pages/Contents'
import { LoginSignUpPage } from '../pages/LoginSignUp'
import { OpenLayout } from '../shared/components/OpenLayout'
import { ProtectedLayout } from '../shared/components/ProtectedLayout'
import { SourcesPage } from '../pages/Sources'
import { ContentPage } from '../pages/Content'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute component={Navigate} to={paths.sources} />,
      },
      {
        path: paths.sources,
        element: <ProtectedRoute component={SourcesPage} />,
      },
      {
        path: paths.contents,
        element: <ProtectedRoute component={ContentsPage} />,
      },
      {
        path: paths.content,
        element: <ProtectedRoute component={ContentPage} />,
      },
    ],
  },
  {
    path: '/',
    element: <OpenLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={paths.loginSignUp} />,
      },
      {
        path: paths.loginSignUp,
        element: <LoginSignUpPage />,
      },
    ],
  },
])
