import './Chessboard.scss'
import { createEffect, onMount, Show } from 'solid-js'
import { Chessground } from 'chessground'
import * as cg from 'chessground/types'
import { Api } from 'chessground/api'
import { Color, Dests, Key } from 'chessground/types'
import { INITIAL_FEN } from './chess_pgn_logic'
import { makePersistedNamespaced } from './storage'
import { Role } from 'chessops'

type MouchEvent = Event & Partial<MouseEvent & TouchEvent>

const resizeHandle = (elements: cg.Elements, is_resize_visible: () => boolean) => {


  let [get_zoom, set_zoom] = makePersistedNamespaced<number>(100, 'zoom')
  document.body.style.setProperty('--zoom', get_zoom().toString())

  const el = document.createElement('cg-resize')
  elements.container.appendChild(el)

  const startResize = (start: MouchEvent) => {
    start.preventDefault()


    const mousemoveEvent = start.type === 'touchstart' ? 'touchmove': 'mousemove',
    mouseupEvent = start.type === 'touchstart' ? 'touchend' : 'mouseup',
    startPos = eventPosition(start)!,
    initialZoom = parseInt(window.getComputedStyle(document.body).getPropertyValue('--zoom'))

    let zoom = initialZoom

    const saveZoom = () => { set_zoom(zoom) }

    const resize = (move: MouchEvent) => {
      const pos = eventPosition(move)!,
      delta = pos[0] - startPos[0] + pos[1] - startPos[1]


      zoom = Math.round(Math.min(100, Math.max(0, initialZoom + delta / 10)))


      document.body.style.setProperty('--zoom', zoom.toString())

      saveZoom()
    }

    document.body.classList.add('resizing')

    document.addEventListener(mousemoveEvent, resize)

    document.addEventListener(mouseupEvent,
      () => {
        document.removeEventListener(mousemoveEvent, resize)
        document.body.classList.remove('resizing')
      }, { once: true})

    }

    el.addEventListener('touchstart', startResize, { passive: false })
    el.addEventListener('mousedown', startResize, { passive: false })


    const toggle = (is_visible: boolean) => el.classList.toggle('none', !is_visible)

    createEffect(() => {
      toggle(is_resize_visible())
    })
}

function eventPosition(e: MouchEvent): [number, number] | undefined {
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY!];
  if (e.targetTouches?.[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return;
}

const Chessboard = (props: { resizable?: boolean, orientation?: Color, movable?: boolean, fen_uci?: [string, string | undefined], endPendingPromotion: (_: Role | undefined) => void, pendingPromotion: boolean, doPromotion: [Key, Role] | undefined, onMoveAfter: (orig: Key, dest: Key) => void, color: Color, dests: Dests }) => {

    let board: HTMLElement
    let ground: Api

    onMount(() => {

      let color = props.color
      let dests = props.dests

      let config = {
        events: {
          insert(elements: cg.Elements) {
            resizeHandle(elements, () => props.resizable || false)
          }
        },
        premovable: {
          enabled: false
        },
        movable: {
          color,
          free: false,
          dests,
          events: {
            after: props.onMoveAfter,
            
          }
        }
      }
      ground = Chessground(board, config)
    })

    createEffect(() => {
      let fen, uci
      if (!props.fen_uci) {
        fen = INITIAL_FEN
      } else {
        [fen, uci] = props.fen_uci
      }
      let lastMove: Key[] = []
      if (uci) {
        lastMove.push(uci.slice(0, 2) as Key)
        lastMove.push(uci.slice(2, 4) as Key)
      }
      let movableColor = props.movable ? props.color : undefined
      ground.set({fen, lastMove, turnColor: props.color, movable: {
        color: movableColor,
        dests: props.dests
      }})
    })

    createEffect(() => {
      let color = props.orientation ?? 'white'
      ground.set({
        orientation: color
      })
    })

    createEffect(() => {
      let kr = props.doPromotion
      if (kr) {
        let [key, role] = kr
        let piece = ground.state.pieces.get(key)!
        ground.setPieces(
          new Map([
            [
              key,
              {
                color: piece.color,
                role,
                promoted: true
              }
            ]
          ])
        )
      }
    })

    return (<>
    <>
      <div ref={(el) => board = el} class='is2d chessboard'>

      </div>
      <Show when={props.pendingPromotion}>
        <div onClick={() => props.endPendingPromotion(undefined)} id='promotion-choice' class='is2d top'>
          {/* @ts-ignore */}
          <square onClick={()=> props.endPendingPromotion('q') } style="top: 0%; left: 75%"><piece class='queen white'></piece></square>
          {/* @ts-ignore */}
          <square onClick={()=> props.endPendingPromotion('r') } style="top: 12.5%; left: 75%"><piece class='rook white'></piece></square>
          {/* @ts-ignore */}
          <square onClick={()=> props.endPendingPromotion('n') } style="top: 25%; left: 75%"><piece class='knight white'></piece></square>
          {/* @ts-ignore */}
          <square onClick={()=> props.endPendingPromotion('b') } style="top: 37.5%; left: 75%"><piece class='bishop white'></piece></square>
        </div>
      </Show>
    </>
    </>)
}


export default Chessboard