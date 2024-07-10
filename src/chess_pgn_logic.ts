
import { Chess, Position, makeUci, parseUci } from 'chessops'
import { INITIAL_FEN, makeFen, parseFen } from 'chessops/fen'
import { PgnNodeData, ChildNode, parsePgn } from 'chessops/pgn'
import { makeSan, parseSan } from 'chessops/san'
import { Signal, createSignal } from 'solid-js'

export { INITIAL_FEN } from 'chessops/fen'

export class Pgn {


    static make_many = (pgn: string) => {
        return parsePgn(pgn).map(g => {

            let event = g.headers.get('Event')
            let site = g.headers.get('Site')

            let white = g.headers.get('White')
            let black = g.headers.get('Black')
            let puzzle = g.headers.get('Puzzle')

            let fen = g.headers.get('FEN')

            let child = g.moves.children[0]

            let before_fen = fen ?? INITIAL_FEN
            let san = child.data.san
            let i_pos = Chess.fromSetup(parseFen(before_fen).unwrap()).unwrap()
            let move = parseSan(i_pos, san)!
            let uci = makeUci(move)

            let t = MoveTree.make(before_fen, [uci])

            if (g.comments) {
                t.set_root_comments(g.comments.join('\n'))
            }

            append_children(t, child, i_pos, [])

            function append_children(t: MoveTree, child: ChildNode<PgnNodeData>, before_pos: Position, path: string[]) {
                let move = parseSan(before_pos, child.data.san)!

                let after_pos = before_pos.clone()
                after_pos.play(move)
                let uci = makeUci(move)
                t.append_uci(uci, path)
                if (child.data.comments) {
                  t.set_comments([...path, uci], child.data.comments.join('\n'))
                }
                child.children.forEach(child => {
                    append_children(t, child, after_pos, [...path, uci])
                })
            }

            let res = new Pgn({
                fen,
                event, site, white, black,
                puzzle
             }, t)
            return res
        })
    }


    get event() {
        return this.headers.event
    }

    get site() {
        return this.headers.site
    }

    get white() {
        return this.headers.white
    }

    get black() {
        return this.headers.black
    }

    get puzzle() {
        return this.headers.puzzle
    }

    get fen() {
        return this.headers.fen
    }

    constructor(
        readonly headers: PgnHeaders,

        readonly tree: MoveTree) { }


    get plain() {
        let res = []

        if (this.fen && this.fen !== '?') {
            res.push(`[FEN "${this.fen}"]`)
        }
        if (this.event && this.event !== '?') {
            res.push(`[Event "${this.event}"]`)
        }
        if (this.site && this.site !== '?') {
            res.push(`[Site "${this.site}"]`)
        }
        if (this.white && this.white !== '?') {
            res.push(`[White "${this.white}"]`)
        }
        if (this.black && this.black !== '?') {
            res.push(`[Black "${this.black}"]`)
        }

        if (this.puzzle && this.puzzle !== '?') {
            res.push(`[Puzzle "${this.puzzle}"]`)
        }







        return res.join('\n') + '\n\n' + this.tree.text
    }
}

export type PgnHeaders = {
    fen?: string,
   event?: string, 
   site?: string,
   white?: string,
   black?: string,
   puzzle?: string,
}

export class TreeNode<V> {

    static before_color_of(_: TreeNode<MoveData>) {
        return parseFen(_.data.before_fen).unwrap().turn
    }

    static make = <V>(data: V) => {
        return new TreeNode<V>(data)
    }

    get clone() {

        let res = new TreeNode({ ...this.data })
        res.children = this.children.map(_ => _.clone)

        return res
    }

    get mainline_only() {
        let res = new TreeNode({ ... this.data })
        res.children = this.children.slice(0, 1).map(_ => _.mainline_only)
        return res
    }

    get length() {

        if (this.children.length > 1) {
            return 1
        }

        if (this.children.length === 0) {
            return 0
        }

        let res = 1
        let i = this.children[0]

        while (i?.children.length === 1) {
            res++
            i = i.children[0]
        }
        return res
    }

    get nb_first_variations() {
        return this.children_first_variations?.length ?? 0
    }

    get children_first_variations() {

        let i = this.children

        while (i?.length === 1) {
            i = i[0].children
        }

        if (i.length > 1) {
            return i
        }
    }

    get children() {
        return this._children[0]()
    }

    set children(c: TreeNode<V>[]) {
        this._children[1](c)
    }

    _children: Signal<TreeNode<V>[]>

    constructor(readonly data: V) {
        this._children = createSignal([] as TreeNode<V>[])
    }
}


export type MoveScoreData = {
    path: string[],
    uci: string,
    score: number
}


export type MoveData = {
    path: string[],
    before_fen: string,
    after_fen: string,
    san: string,
    uci: string,
    ply: number,
    comments?: string,
}

export class MoveTree {

    static make = (before_fen: string, ucis: string[]) => {
        let res = new MoveTree(before_fen, [])
        res.append_ucis(ucis)
        return res
    }

    
    get text() {

        function render_data(data: MoveData, show_index = false) {
            let ply = data.ply
            let i = (ply % 2 === 1 || show_index) ? (Math.ceil(ply/ 2) + (ply % 2 === 1 ? '.' : '...')) : ''
            let tail = ply %2 === 1 ? '' : ' '
            return `${i} ${data.san}${data.comments ? ' { ' + data.comments + ' }' : ''}${tail}`
        }

        function render_lines(ts: TreeNode<MoveData>[], show_index = false, ) {

            let res = ''
            if (ts.length === 0) {
            } else if (ts.length === 1) {
                res += render_data(ts[0].data, show_index)
                res += render_lines(ts[0].children, false)
            } else {
                res += render_data(ts[0].data, false).trimEnd()
                res += ' ' + ts.slice(1).map(_ => `(${render_lines([_], true).trimEnd()})`).join(' ')
                res += ' ' + render_lines(ts[0].children, true)
            }
            return res
        }

        return (this.comments ? `{ ${this.comments} } ` : '') + render_lines(this.root, true)
    }


    get initial_color() {
        return TreeNode.before_color_of(this.root[0])
    }

    get clone() {
        return new MoveTree(this.before_fen, this.root.map(_ => _.clone), this.comments)
    }

    get mainline_only() {
        return new MoveTree(this.before_fen, this.root.slice(0, 1).map(_ => _.mainline_only))
    }



    _root: Signal<TreeNode<MoveData>[]>

    get root() {
        return this._root[0]()
    }

    set root(_: TreeNode<MoveData>[]) {
        this._root[1](_)
    }

    constructor(readonly before_fen: string, root: TreeNode<MoveData>[], public comments?: string) {
        this._root = createSignal(root, { equals: false })
    }

    static make_data(before_fen: string, uci: string, ply: number, path: string[]) {
        let setup = parseFen(before_fen).unwrap()
        let pos = Chess.fromSetup(setup).unwrap()
        let move = parseUci(uci)!
        let san = makeSan(pos, move)
        pos.play(move)
        return {
            path: [...path, uci],
            ply,
            before_fen,
            san,
            after_fen: makeFen(pos.toSetup()),
            uci,
        }
    }

    _traverse_path(path: string[]) {

        let res = undefined
        let i = this.root
        for (let p of path) {
            res = i.find(_ => _.data.uci === p)!
            i = res?.children || this.root
        }
        return res
    }

    _find_path(ucis: string[]): [string[], TreeNode<MoveData> | undefined, string[]] | undefined {
        let path = []
        let rest = []
        let res: TreeNode<MoveData> | undefined
        let i = this.root
        let split = false
        for (let p of ucis) {

            if (split) {
                rest.push(p)
            } else {
                let i_res = i.find(_ => _.data.uci === p)!
                if (!i_res) {
                    split = true
                    rest.push(p)
                } else {
                    path.push(p)
                    res = i_res
                    i = res!.children
                }
            }
        }

        return [path, res, rest]
    }

    get_children(path: string[]) {
        let i = this._traverse_path(path)
        return i?.children.map(_ => _.data)
    }

    get_at(path: string[]) {
        let i = this._traverse_path(path)
        return i?.data
    }

    append_uci(uci: string, path: string[] = []) {
        this.append_ucis([...path, uci])
    }

    append_ucis(ucis: string[]) {
        let [path, i, rest] = this._find_path(ucis)!
        if (!i) {
            let ply_2_if_black = parseFen(this.before_fen).unwrap().turn === 'black' ? 2 : 1
            let uci = rest[0]
            let child = TreeNode.make(
                MoveTree.make_data(this.before_fen, uci, ply_2_if_black, path)
            )
            this.root.push(child)
            this.root = this.root

            rest = rest.slice(1)
        }

        for (let uci of rest) {
            let child: TreeNode<MoveData> = TreeNode.make(
                MoveTree.make_data(i!.data.after_fen, uci, i!.data.ply + 1, path)
            )
            let i_children = i!.children
            i!.children = [...i_children, child]
            i = child
            path = [...path, uci]
        }
    }

    set_root_comments(comments: string) {
        this.comments = comments
    }

    set_comments(ucis: string[], comment: string) {
        let [_path, i, _rest] = this._find_path(ucis)!

        if (i) {
          i.data.comments = comment
        }
    }
}
