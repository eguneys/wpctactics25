import { Show, createEffect, createMemo, createResource, createSignal, on, onCleanup, onMount } from 'solid-js'
import Chessboard from './Chessboard'
import Chesstree2, { Treelala2 } from './Chesstree2'
import './Home.scss'
import { Shala } from './Shalala'
import StudyRepo, { PGNStudy } from './studyrepo'
import { useParams } from '@solidjs/router'
import { opposite } from 'chessops'
import { usePlayer } from './sound'


const Home = () => {

    const params = useParams()
    let _id = params.id
    console.log(_id)

    const [pgn] = createResource('u1600', StudyRepo.read_study)

    return (<>

<Show when={pgn.loading} fallback={
    <HomeLoaded pgn={pgn()!}/>
}>
    <span>Loading...</span>
</Show>
    </>)
}

const HomeLoaded = (props: { pgn: PGNStudy }) => {

    const Player = usePlayer()
    const [is_jump_to_next_puzzle_immediately, set_is_jump_to_next_puzzle_immediately] = createSignal(false)

    const [is_pending, set_is_pending] = createSignal(false)
    const [is_view_solution, set_is_view_solution] = createSignal(false)

    const [i_chapter_index, set_i_chapter_index] = createSignal(0)
    const selected_chapter = createMemo(() => props.pgn.chapters[i_chapter_index()])

    set_i_chapter_index(0)
    const shalala = new Shala()
    const puzzle_lala = createMemo(on(selected_chapter, (chapter) => {
        let res = Treelala2.make(chapter.pgn.tree)

      res.tree!.root.children.map(_ => _.data.path).forEach(_ => res._hidden_paths.add_path(_))
        shalala.on_set_fen_uci(res.initial_fen)

        set_is_view_solution(false)
      setTimeout(() => {
        res.cursor_path = res.tree!.root.data.path
        set_is_view_solution(true)
      }, 600)

      return res
    }))


    createEffect(on(() => shalala.add_uci, (uci?: string) => {
        if (!uci) {
            return
        }

        let success = puzzle_lala().try_next_uci_fail(uci)

        if (success) {
            set_is_pending(true)
            setTimeout(() => {
                puzzle_lala().reveal_one_random()
                set_is_pending(false)
            }, 600)
        }
    }))


    createEffect(on(() => puzzle_lala().fen_last_move, (res) => {
        if (res) {
            let [fen, last_move] = res
            shalala.on_set_fen_uci(fen, last_move)
        } else {
            shalala.on_set_fen_uci(puzzle_lala().initial_fen)
        }
    }))

    createEffect(on(() => puzzle_lala().tree?.get_at(puzzle_lala().cursor_path), (v) => {

        if (v) {
            Player.move(v)
        }

    }))

    const on_next_puzzle = () => {
        
        set_i_chapter_index(i_chapter_index() + 1)
    }

    const on_view_solution = () => {
        if (!is_view_solution()) {
            return false
        }
        puzzle_lala().reveal_hidden_paths()
    }

    createEffect(() => {
        if (puzzle_lala().is_revealed && is_jump_to_next_puzzle_immediately()) {

            setTimeout(() => {
                on_next_puzzle()
            }, 600)
        }
    })

    createEffect(on(() => shalala.on_wheel, (dir) => {
        if (is_pending()) {
            return
        }
        if (dir) {
            puzzle_lala().on_wheel(dir)
        }
    }))


    const onWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        if (
            target.tagName !== 'PIECE' &&
            target.tagName !== 'SQUARE' &&
            target.tagName !== 'CG-BOARD'
        )
            return;
        e.preventDefault();
        shalala.set_on_wheel(Math.sign(e.deltaY))

    }

    let el_sixth: HTMLDivElement

    onMount(() => {
        el_sixth.addEventListener('wheel', onWheel, { passive: false })
    })
    onCleanup(() => {
        el_sixth.removeEventListener('wheel', onWheel)
    })

    const turn_to_play = createMemo(() => opposite(puzzle_lala().initial_color!))

    return (<>
        <div ref={_ => el_sixth = _} class='home'>

            <div class='board-wrap'>
                <Chessboard
                    orientation={opposite(puzzle_lala().initial_color ?? 'white')}
                    movable={!is_pending() && !puzzle_lala().is_revealed && puzzle_lala().is_next_hidden_cursor_path}
                    doPromotion={shalala.promotion}
                    onMoveAfter={shalala.on_move_after}
                    fen_uci={shalala.fen_uci}
                    color={shalala.turnColor}
                    dests={shalala.dests} />


            </div>
            <div class='replay-wrap'>
                <div class='replay'>
                    <div class='replay-header'>
                        <span>#1</span>
                        <span>All Puzzles</span>
                        <span>lichess</span>
                    </div>
                    <div class='replay-v'>
                        <Chesstree2 lala={puzzle_lala()}/>
                    </div>
                    <div class='replay-jump'>
                        <button onClick={() => puzzle_lala().navigate_first()} class={"fbt first" + (!is_pending() && puzzle_lala().can_navigate_prev ? '' : ' disabled')} data-icon=""/>
                        <button onClick={() => puzzle_lala().navigate_prev()} class={"fbt prev" + (!is_pending() && puzzle_lala().can_navigate_prev ? '' : ' disabled')} data-icon=""/>
                        <button onClick={() => puzzle_lala().navigate_next()} class={"fbt next" + (!is_pending() && puzzle_lala().can_navigate_next ? '' : ' disabled')} data-icon=""/>
                        <button onClick={() => puzzle_lala().navigate_last()} class={"fbt last" + (!is_pending() && puzzle_lala().can_navigate_next ? '' : ' disabled')} data-icon=""/>
                    </div>
                    <div class='replay-tools'>
                        <Show when={puzzle_lala().is_revealed} fallback={
                            <>
                                <div class='info'>
                                    <h3><span class='turn'>{turn_to_play()}</span> to play</h3>
                                    <span>Find the best move for {turn_to_play()}</span>
                                </div>
                                <span onClick={() => on_view_solution()} class={'solution' + (is_view_solution() ? '' : ' fade-out')}>View Solution</span>
                            </>
                        }>
                            <>
                                <h3>Puzzle Completed!</h3>

                                <Show when={!is_jump_to_next_puzzle_immediately()}>
                                    <span onClick={() => on_next_puzzle()} class='link'>Continue with next puzzle.</span>
                                </Show>
                            </>
                        </Show>
                    </div>
                </div>
            </div>
            <div class='side'>
                <div class='side-header'>
                    <span class='title'>Puzzle Set U1600 </span>
                    <span class='run'>Run #1</span>
                    <span class='time'>Total Time: 1:02:50</span>
                </div>
                <div class='side-tools'>
                    <div class='jump-toggle'>
                      <input onChange={_ => set_is_jump_to_next_puzzle_immediately(_.currentTarget.checked)} type='checkbox' id='jump-next' checked={is_jump_to_next_puzzle_immediately()}></input>
                      <label for='jump-next'>Jump to next puzzle immediately</label>
                    </div>
                    <div class='show-dropdown'>
                        <label for='show-only'>Show Only</label> 
                        <select id='show-only'>
                            <option value='failed'>Solved Puzzles</option>
                            <option value='failed'>Unseen Puzzles</option>
                            <option value='failed'>Failed Puzzles</option>
                            <option value='failed'>Skipped Puzzles</option>
                        </select>
                    </div>
                </div>
                <div class='side-list'>
                    List of Puzzles in the Set
                </div>
            </div>
        </div>
    </>)
}

export default Home