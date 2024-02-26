import { createMemo, lazy } from 'solid-js'
import { MetaProvider } from '@solidjs/meta'
import './App.scss'
import { A, Route, HashRouter, useLocation } from '@solidjs/router'

const Home = lazy(() => import('./Home'))

function App() {
  return (
    <>
        <MetaProvider>
        <HashRouter root={AppInRouter}>
          <Route path='/' component={Home} />
        </HashRouter>
      </MetaProvider>
    </>
  )
}

function AppInRouter(props: any) {

  let location = useLocation()
  let pathname = createMemo(() => location.pathname.split('/')[1])

  const path_klass = () => {
    let p = pathname()
    return `on-${p||'home'}`
  }


  return (<>
    <div class='root'>
      <header>
        <div class='title-nav'>
          <h1><A href="/">Woodpecker Chess Tactics</A></h1>
        </div>
        <nav id='topnav'>
        </nav>
      </header>
      <div class={'main-wrap ' + path_klass()}>

        <div class='main'>
          {props.children}
        </div>
      </div>
    </div>
  </>)
}

export default App
