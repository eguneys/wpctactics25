import { lazy } from 'solid-js'
import { MetaProvider } from '@solidjs/meta'
import './App.scss'
import { A, Route, Router } from '@solidjs/router'

const Home = lazy(() => import('./Home'))

function App() {
  return (
    <>
        <MetaProvider>
        <Router root={AppInRouter}>
          <Route path='/' component={Home} />
        </Router>
      </MetaProvider>
    </>
  )
}

function AppInRouter(props: any) {

  return (<>
    <div class='root'>
      <header>
        <div class='title-nav'>
          <h1><A href="/">Woodpecker Chess Tactics</A></h1>
        </div>
        <nav id='topnav'>
        </nav>
      </header>
      <div class='main-wrap'>

        <div class='main'>
          {props.children}
        </div>
      </div>
    </div>
  </>)
}

export default App
