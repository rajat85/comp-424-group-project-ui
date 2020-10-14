import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'
import {useAuth} from './context/auth-context'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  return (
    <React.Suspense fallback={<Spinner animation="grow" />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App;
