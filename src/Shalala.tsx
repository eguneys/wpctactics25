import './Shalala.css'
import { Signal, batch, createMemo, createSignal } from 'solid-js'
import { INITIAL_FEN, makeFen, parseFen } from 'chessops/fen'
import { Chess, Color, Position, Role, parseSquare, parseUci, } from 'chessops'
import { chessgroundDests } from 'chessops/compat'
import { Dests, Key } from 'chessground/types'


const fen_color = (fen: string) => {
  return parseFen(fen).unwrap().turn
}

type Memo<A> = () => A

export class Shala {

    static init = () => {
        return new Shala()
    }

    get position() {
        return this._position[0]()
    }

    set position(p: Position) {
        this._position[1](p)
    }

    get turnColor() {
      return this.m_color()
    }

    get add_uci() {
      return this._add_uci[0]()
    }

    set add_uci(uci: string | undefined) {
      this._add_uci[1](uci)
    }


    get last_move() {
      return this._last_move[0]()
    }

    set last_move(uci: string | undefined) {
      this._last_move[1](uci)
    }

    get promotion() {
      return this._promotion[0]()
    }

    set promotion(_: [Key, Role] | undefined) {
      this._promotion[1](_)
    }

    get uci_pending_promotion() {
      return this._uci_pending_promotion[0]()
    }
    
    set uci_pending_promotion(uci: [Key, Key, string, string | undefined] | undefined) {
      this._uci_pending_promotion[1](uci)
    }

    get uci_pending_promotion_color_dest() {
      let _ = this.uci_pending_promotion
      if (_) {
        let [_orig, dest, fen, _last_move] = _

        return { color: fen_color(fen), dest }
      }
    }

    _uci_pending_promotion: Signal<[Key, Key, string, string | undefined] | undefined>
    _add_uci: Signal<string | undefined>
    _promotion: Signal<[Key, Role] | undefined>
    _position: Signal<Position>
    m_fen: Memo<string>
    m_dests: Memo<Dests>
    m_color: Memo<Color>

    _last_move: Signal<string | undefined>

    constructor() {

      this._on_wheel = createSignal<number | undefined>(undefined, { equals: false })
      this._last_move = createSignal<string | undefined>(undefined, { equals: false })
      this._add_uci = createSignal<string | undefined>(undefined, { equals: false })
      this._promotion = createSignal<[Key, Role] | undefined>(undefined, { equals: false })
      this._uci_pending_promotion = createSignal<[Key, Key, string, string | undefined] | undefined>(undefined, { equals: false })

      this._position = createSignal(Chess.fromSetup(parseFen(INITIAL_FEN).unwrap()).unwrap(), { equals: false })

      this.m_dests = createMemo(() => chessgroundDests(this.position))

      this.m_fen = createMemo(() => makeFen(this.position.toSetup()))

      this.m_color = createMemo(() => this.position.turn)
    }

    _on_wheel: Signal<number | undefined>

    set_on_wheel = (dir: number) => {
      this._on_wheel[1](dir)
    }

    get on_wheel() {
      return this._on_wheel[0]()
    }

    on_set_fen_uci = (fen: string, last_move?: string) => {
      batch(() => {
        this.add_uci = undefined
        this.last_move = last_move
        this.position = Chess.fromSetup(parseFen(fen).unwrap()).unwrap()
      })
    }

    reset_move_after = () => {
      this.position = this.position
    }

    on_move_after = (orig: Key, dest: Key) => {
      let fen = this.fen
      let last_move = this.last_move
      
      let piece = this.position.board.get(parseSquare(orig)!)!

      let uci = orig + dest
      if (piece.role === 'pawn' && 
      ((dest[1] === '8' && this.turnColor === 'white') || (dest[1] === '1' && this.turnColor === 'black'))) {
        //uci += 'q'

        this.uci_pending_promotion = [orig, dest, fen, last_move]
        return
      }


      this.do_play_uci(uci)
    }

    on_promotion_end = (promotion?: Role) => {
      let od = this.uci_pending_promotion
      this.uci_pending_promotion = undefined

      if (od) {
        let [orig, dest, fen, last_move] = od
        if (promotion) {
          this.do_play_uci(orig + dest + promotion, [dest, promotion])
        } else {
          this.on_set_fen_uci(fen, last_move)
        }
      }
    }

    do_play_uci(uci: string, promotion?: [Key, Role]) {
      batch(() => {
        this.position.play(parseUci(uci)!)
        this.last_move = uci
        this.position = this.position
        this.promotion = promotion
        this.add_uci = uci
        console.log(promotion)
      })
    }

    get fen_uci(): [string, string | undefined] {

      let fen = this.fen
      let uci = this.last_move

      return [fen, uci]
    }

    get fen() {
        return this.m_fen()
    }

    get dests() {
        return this.m_dests()
    }
}