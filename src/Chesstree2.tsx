import './tree.css'
import { For, Match, Show, Signal, Switch, batch, createEffect, createMemo, createSignal, untrack } from 'solid-js'
import { INITIAL_FEN, MoveData, MoveTree, TreeNode } from './chess_pgn_logic'

export class TwoPaths2 {

  static set_for_saving(paths: string[][]): TwoPaths2 {
    let res = new TwoPaths2()
    res.paths = paths
    return res
  }

  _paths: Signal<string[][]>

  get paths() {
    return this._paths[0]().slice(0)
  }

  set paths(_: string[][]) {
    this._paths[1](_)
  }

  constructor() {
    this._paths = createSignal<string[][]>([], { equals: false })
  }

  get clone() {
    let res = new TwoPaths2()
    res.paths = this.paths.slice(0)
    return res
  }

  get_for_saving(): string[][] {
    return this.paths
  }

  merge_dup(paths: TwoPaths2) {
    paths.paths.forEach(_ => untrack(() => this.add_path(_)))
  }

  replace_all(tp: TwoPaths2) {
    this.paths = tp.paths.slice(0)
  }

  add_path(path: string[]) {

    let bs = this.paths

    if (bs.find(_ => _.join('') === path.join(''))) {
      return
    }

    /*
    if (bs.find(_ => _.join('').startsWith(path.join('')))) {
      return
    }

    let rm = bs.findIndex(_ => path.join('').startsWith(_.join('')))
    if (rm !== -1) {
      bs.splice(rm, 1, path)
    } else {
      bs.push(path)
    }
    */
   bs.push(path)
    this.paths = bs
  }

  remove_path(path: string[]) {
    this.paths = this.paths.filter(_ => _.join('') !== path.join(''))
  }

  clear() {
    if (this.paths.length > 0) {
      this.paths = []
    }
  }

}


export class Treelala2 {


  static make = (tree?: MoveTree, initial_fen = tree?.before_fen ?? INITIAL_FEN) => {
    let res = new Treelala2(initial_fen, tree)
    return res
  }

  _tree: Signal<MoveTree | undefined>

  _cursor_path: Signal<string[]>

  _hidden_paths: TwoPaths2
  _revealed_paths: TwoPaths2
  _failed_paths: TwoPaths2
  _solved_paths: TwoPaths2

  get hidden_paths() {
    return this._hidden_paths.paths
  }
  get revealed_paths() {
    return this._revealed_paths.paths
  }
  get failed_paths() {
    return this._failed_paths.paths
  }

  get solved_paths() {
    return this._solved_paths
  }

  get failed_paths_expanded() {
    return this._failed_paths.paths
  }

  get solved_paths_expanded() {
    return this._solved_paths.paths
  }
  get revealed_paths_expanded() {
    return this._revealed_paths.paths
  }


  get initial_color() {
    return this.tree?.initial_color
  }

  get cursor_path() {
    return this._cursor_path[0]()
  }

  get tree() {
    return this._tree[0]()
  }

  set cursor_path(path: string[]) {
    this._cursor_path[1](path)
  }

  set tree(tree: MoveTree | undefined) {
    this._tree[1](tree)
  }

  get fen_last_move() {
    let t = this.tree
    if (t) {
      let i = t.get_at(this.cursor_path)
      if (!i) {
        return undefined
      }
      let fen = i.after_fen
      let last_move = i.uci
      return [fen, last_move]
    }
  }



  try_set_cursor_path(path: string[]) {
    let hidden_paths = this.hidden_paths
    if (hidden_paths.find(_ => path.join('').startsWith(_.join('')))) {
      return false
    }
    this.cursor_path = path
    return true
  }



  constructor(readonly initial_fen: string, tree?: MoveTree) {
    this._cursor_path = createSignal<string[]>([], { equals: false })
    this._tree = createSignal(tree)

    this._hidden_paths = new TwoPaths2()
    this._revealed_paths = new TwoPaths2()
    this._failed_paths = new TwoPaths2()
    this._solved_paths = new TwoPaths2()
  }

  get is_revealed() {
    //return this.hidden_paths.length === 0

    let r = this.revealed_paths_expanded.pop()
    let l = this.solved_paths_expanded.pop()
    let no_h = this.hidden_paths.length === 0

    if (no_h) {
      return true
    }

    if (!r) {
  
      if (!l) {
        return false
      }
  
      return this.tree?.get_children(l)?.length === 0
    }
    return true
  }

  reveal_hidden_paths = () => {
    batch(() => {
      this.hidden_paths.forEach(_ => {
        this._revealed_paths.add_path(_)
      })
      this._hidden_paths.clear()
    })
  }

  reveal_from_mainline = () => {
    if (!this.tree) {
      return false
    }

    let cc = this.tree?._traverse_path(this.cursor_path)?.children ?? this.tree.root

    const c_found = cc[0]
    if (c_found) {
      batch(() => {
        this._hidden_paths.remove_path(c_found.data.path)
        c_found.children.forEach(_ => this._hidden_paths.add_path(_.data.path))
        this.cursor_path = c_found.data.path
      })
      return c_found.data.uci
    }
  }

  reveal_one_random = () => {

    if (!this.tree) {
      return false
    }

    let cc = this.tree?._traverse_path(this.cursor_path)?.children ?? this.tree.root

    const c_found = weightedRandomSelect(cc)
    if (c_found) {
      batch(() => {
        this._hidden_paths.remove_path(c_found.data.path)
        c_found.children.forEach(_ => this._hidden_paths.add_path(_.data.path))
        this.cursor_path = c_found.data.path
      })
      return c_found.data.uci
    }
  }

  try_next_uci_fail = (uci: string) => {

    if (!this.tree) {
      return false
    }

    const a0 = this.tree?._traverse_path(this.cursor_path)
    const cc = this.tree?._traverse_path(this.cursor_path)?.children ?? this.tree.root

    const c_found = cc.find(_ => _.data.uci === uci) ??  cc.find(_ => castles_uci_fix(_.data) === uci)



    if (c_found) {


      let in_failed_path = this.failed_paths_expanded.find(_ => _.join('') === c_found.data.path.join(''))

      if (in_failed_path) {
        setTimeout(() => {
          this.cursor_path = this.cursor_path
        }, 100)
        return

      }

      batch(() => {
        this._hidden_paths.remove_path(c_found.data.path)
        c_found.children.forEach(_ => this._hidden_paths.add_path(_.data.path))
        this._solved_paths.add_path(c_found.data.path)
        this.cursor_path = c_found.data.path
      })
      return true
    } else {

      if (this.is_revealed) {
        setTimeout(() => {
          this.cursor_path = this.cursor_path
        }, 100)
        return
      }

      this.add_uci(uci)
      if (a0) {
        this._failed_paths.add_path([...a0.data.path, uci])
      } else {
        this._failed_paths.add_path([uci])
      }

      setTimeout(() => {
        this.on_wheel(-1)
      }, 100)
      return false
    }
  }



    on_wheel = (dir: number) => {
        let path = this.cursor_path
        if (dir < 0) {
          if (path.length > 0) {
            this.try_set_cursor_path(path.slice(0, -1))
          }
        } else {
          let t = this.tree
          if (t) {

            let i
            if (path.length === 0) {
              i = t.root
            } else {
              i = t._traverse_path(path)?.children
            } 

            let new_path = i?.map(_ => _.data.path)
            .find(_ => !this.hidden_paths?.some(h => _.join('').startsWith(h.join(''))))
            if (new_path) {
              this.try_set_cursor_path(new_path)
            }
          }
        }
    }

    add_uci(uci: string) {
      let t = this.tree
      let path = this.cursor_path
      if (!t) {
        t = MoveTree.make(this.initial_fen, [uci])
      } else {
        t.append_uci(uci, path)
      }
      path = [...path, uci]
      batch(() => {
        this.tree = t
        this.cursor_path = path
      })
      return path
    }

  get is_next_hidden_cursor_path() {
    let path = this.cursor_path
    let t = this.tree
    if (t) {

      let i
      if (path.length === 0) {
        i = t.root
      } else {
        i = t._traverse_path(path)?.children
      }

      return !!i?.map(_ => _.data.path)
        .find(_ => this.hidden_paths?.some(h => _.join('').startsWith(h.join(''))))
    }
  }


  get can_navigate_next() {
    let path = this.cursor_path
    let t = this.tree
    if (t) {

      let i
      if (path.length === 0) {
        i = t.root
      } else {
        i = t._traverse_path(path)?.children
      }

      let new_path = i?.map(_ => _.data.path)
        .find(_ => !this.hidden_paths?.some(h => _.join('').startsWith(h.join(''))))
        return new_path !== undefined
    }
    return false
  }

    get can_navigate_prev() {
      return this.cursor_path.length > 0
    }

    navigate_last(): void {
      let path = this.cursor_path
      let t = this.tree
      if (t) {

        let i
        if (path.length === 0) {
          i = t.root
        } else {
          i = t._traverse_path(path)?.children
        }

        let new_path = i?.map(_ => _.data.path)
          .find(_ => !this.hidden_paths?.some(h => _.join('').startsWith(h.join(''))))
        if (new_path) {

          let i = t._traverse_path(new_path)
          while (i!.children.length > 0) {
            if (this.hidden_paths?.some(h => i!.children[0].data.path.join('').startsWith(h.join('')))) {
              break
            }
            i = i!.children[0]
          }

          new_path = i!.data.path
          this.try_set_cursor_path(new_path)
        }
      }
    }

    navigate_next(): void {
      let path = this.cursor_path
      let t = this.tree
      if (t) {

        let i
        if (path.length === 0) {
          i = t.root
        } else {
          i = t._traverse_path(path)?.children
        }

        let new_path = i?.map(_ => _.data.path)
          .find(_ => !this.hidden_paths?.some(h => _.join('').startsWith(h.join(''))))
        if (new_path) {
          this.try_set_cursor_path(new_path)
        }
      }
    }
    navigate_prev(): void {
      this.try_set_cursor_path(this.cursor_path.slice(0, -1))
    }
    navigate_first(): void {
      this.try_set_cursor_path(this.cursor_path.slice(0, 1))
    }

}

const Chesstree2 = (props: { lala: Treelala2 }) => {

    let el_move: HTMLDivElement
    createEffect(() => {

      let path = props.lala.cursor_path
      let cont = el_move.parentElement
      if (!cont) {
        return
      }

      const target = el_move.querySelector<HTMLElement>('.on_path_end')
      if (!target) {
        cont.scrollTop = path.length > 0 ? 99999 : 0
        return
      } 

      let top = target.offsetTop - cont.offsetHeight / 2 + target.offsetHeight
      cont.scrollTo({behavior: 'smooth', top})
    })

    return (<>
      <div ref={_ => el_move = _} class='chesstree'>
          <Show when={props.lala.tree} fallback={
            <>
              
            </>
          }>{tree =>
            <>
            <Show when={props.lala.is_revealed && tree().comments}>{comments => <div class='comment'>{comments()}</div>}</Show>
            <RenderLines 
            show_comments={props.lala.is_revealed}
            on_set_path={path => props.lala.try_set_cursor_path(path)} 
            cursor_path={props.lala.cursor_path} 
            hidden_paths={props.lala.hidden_paths}
            revealed_paths={props.lala.revealed_paths}
            solved_paths={props.lala.solved_paths_expanded}
            failed_paths={props.lala.failed_paths_expanded}
            lines={tree().root}/>
            </>
          }</Show>
      </div>
    </>)
}

const RenderLines = (props: {
  show_comments: boolean,
  on_set_path: (_: string[]) => void, 
  cursor_path: string[], 
  solved_paths: string[][],
  revealed_paths: string[][],
  failed_paths: string[][],
  hidden_paths: string[][],
  lines: TreeNode<MoveData>[], show_index?: true}) => {

    return (<>
      <Switch>
        <Match when={props.lines.length === 1}>
          <RenderData data={props.lines[0].data} {...props}/>
          <RenderLines  {...props} lines={props.lines[0].children} />
        </Match>
        <Match when={props.lines.length > 1}>
          <RenderLines {...props} lines={props.lines.slice(0, 1)}/>
          <div class='lines'>
              <For each={props.lines.slice(1)}>{ child =>
                <div class='line'><RenderLines {...props} lines={[child]} show_index={true}/></div>
              }</For>
          </div>
        </Match>
      </Switch>
    </>)
}

const RenderData = (props: { on_set_path: (_: string[]) => void, 
  show_comments: boolean,
  solved_paths: string[][], 
  revealed_paths: string[][], 
  failed_paths: string[][], 
  hidden_paths: string[][], 
  cursor_path: string[], data: MoveData, show_index?: boolean, collapsed?: true }) => {

    let index = `${Math.ceil(props.data.ply / 2)}.`
    if (props.data.ply % 2 === 0) {
        index += '..'
    }

    let on_path = createMemo(() => props.cursor_path.join('').startsWith(props.data.path.join('')))
    let on_path_end = createMemo(() => props.cursor_path.join('') === props.data.path.join(''))

    let my_path = createMemo(() => props.data.path.join(''))
    let on_hidden_path_start = createMemo(() => props.hidden_paths.find(_ => _.join('') === my_path())!)
    let on_hidden_path_rest = createMemo(() => props.hidden_paths.find(_ => my_path().startsWith(_.join('')))!)

    let on_revealed_path_start = createMemo(() => props.revealed_paths.find(_ => _.join('') === my_path())!)
    let on_revealed_path_rest = createMemo(() => props.revealed_paths.find(_ => my_path().startsWith(_.join('')))!)

    let on_failed_path = createMemo(() => props.failed_paths.find(_ => _.join('') === my_path())!)

    let on_solved_path = createMemo(() => props.solved_paths.find(_ => _.join('') === my_path())!)

    let move_on_path_klass = createMemo(() => ['move', 
    on_path_end()?'on_path_end':on_path()?'on_path':'',
    on_hidden_path_start() ? 'on_hidden_path_start':on_hidden_path_rest() ? 'on_hidden_path': '',
    on_revealed_path_start() ? 'on_revealed_path_start':on_revealed_path_rest() ? 'on_revealed_path': '',
    on_failed_path() ? 'on_failed_path': '',
    on_solved_path() ? 'on_solved_path': '',
    props.collapsed ? 'collapsed': ''
   ].join(' '))
    return <>
      <div onClick={() => props.on_set_path(props.data.path)} class={move_on_path_klass()} ><Show when={props.show_index || props.data.ply & 1}><span class='index'>{index}</span></Show>
      {props.data.san} 
      </div>
      <Show when={props.show_comments && props.data.comments}>{comments => <span class='comment'>{comments()}</span> }</Show>
    </>
}

export default Chesstree2



export const ChesstreeShorten = (props: { lala: Treelala2 }) => {


    let el_move: HTMLDivElement
    createEffect(() => {

      let path = props.lala.cursor_path
      let cont = el_move.parentElement
      if (!cont) {
        return
      }

      const target = el_move.querySelector<HTMLElement>('.on_path_end')
      if (!target) {
        cont.scrollTop = path.length > 0 ? 99999 : 0
        return
      } 

      let top = target.offsetTop - cont.offsetHeight / 2 + target.offsetHeight
      cont.scrollTo({behavior: 'smooth', top})
    })

    return (<>
      <div ref={_ => el_move = _} class='chesstree'>
          <Show when={props.lala.tree} fallback={
            <>
              
            </>
          }>{tree =>
            <RenderLinesShorten
            show_comments={props.lala.is_revealed}
            on_set_path={path => props.lala.try_set_cursor_path(path)} 
            cursor_path={props.lala.cursor_path} 
            hidden_paths={props.lala.hidden_paths}
            revealed_paths={props.lala.revealed_paths}
            solved_paths={props.lala.solved_paths_expanded}
            failed_paths={props.lala.failed_paths_expanded}
            lines={tree().root}/>
          }</Show>
      </div>
    </>)
}


const RenderLinesShorten = (props: {
  show_comments: boolean,
  on_set_path: (_: string[]) => void, 
  cursor_path: string[], 
  solved_paths: string[][],
  revealed_paths: string[][],
  failed_paths: string[][],
  hidden_paths: string[][],
  lines: TreeNode<MoveData>[], show_index?: boolean}) => {


    return (<>
      <For each={props.lines}>{line =>
        <>
          <RenderData data={line.data} {...props} />
          <Switch>
            <Match when={line.children.length === 1}>
              <RenderLinesShorten {...props} lines={line.children} show_index={false} />
            </Match>
            <Match when={line.children.length > 1}>
              <div class='lines'>
                <For each={line.children}>{child =>
                  <div class='line'>
                    <Show when={props.cursor_path.join('').startsWith(child.data.path.join(''))} fallback= {
                      <RenderLinesShortenCollapsed {...props} lines={[child]} show_index={true} />
                    }>
                      <RenderLinesShorten {...props} lines={[child]} show_index={true} />
                    </Show>
                    </div>
                }</For>
              </div>
            </Match>
          </Switch>
        </>
      }</For>
    </>)
}

const RenderLinesShortenCollapsed = (props: {
  show_comments: boolean,
  on_set_path: (_: string[]) => void, 
  cursor_path: string[], 
  solved_paths: string[][],
  revealed_paths: string[][],
  failed_paths: string[][],
  hidden_paths: string[][],
  lines: TreeNode<MoveData>[], show_index?: boolean}) => {

    return (<>
      <For each={props.lines}>{line =>
        <>
          <RenderData data={line.data} {...props} collapsed={true} />
          <span class='collapsed'> ..{line.length} {line.nb_first_variations}</span>
        </>
      }</For>
    </>)

  }



/* https://github.com/eguneys/openingsexercise/blob/master/src/pgn.ts#L133 */
function weightedRandomSelect<T>(array: T[]) {
  let totalWeight = (array.length * (array.length + 1)) / 2;
  let randNum = Math.floor(Math.random() * totalWeight) + 1;
  let weightSum = 0;
  for (let i = 0; i < array.length; i++) {
    weightSum += array.length - i;
    if (randNum <= weightSum) {
      return array[i];
    }
  }
}


const castles_uci_fix = (data: MoveData) => {
  let from = data.uci.slice(0, 2)
  let to_rank = data.uci[3]
  if (data.san === 'O-O') {
    return from + 'g' + to_rank
  } else if (data.san === 'O-O-O') {
    return from + 'c' + to_rank
  }
}


/*
function merge_dup(a: string[][], b: string[][]) {
  let res = a.slice(0)
  b.forEach(b => {
    if (res.every(_ => _.join('') !== b.join(''))) {
      res.push(b)
    }
  })
  return res
}
*/