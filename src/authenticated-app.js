/** @jsx jsx */
import {jsx} from '@emotion/core'

import {Switch, Route, Link as RouterLink, useRouteMatch} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {Button} from 'react-bootstrap';
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {useAuth} from './context/auth-context'

function ErrorFallbackPage({error}) {
  return (
    <div>
      Error occured
    </div>
  );
}

function Page() {
  return <div>I'm a page</div>
}

function AuthenticatedApp() {
  const {user, logout} = useAuth()
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main css={{width: '100%'}}>
          <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function NavLink(props) {
  const match = useRouteMatch({path: props.to});
  return (
    <RouterLink
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.text,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          ':hover': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover': {
                background: colors.gray10,
              },
            }
          : null,
      ]}
      {...props}
    />
  )
}

function Nav(params) {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/list" element={<Page />} />
      <Route path="/finished" element={<Page />} />

      <Route path="*" element={<Page />} />
    </Switch>
  )
}

export default AuthenticatedApp
