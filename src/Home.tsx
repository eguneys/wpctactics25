import { For, Match, Show, Switch, batch, createEffect, createMemo, createResource, createSignal, on, onCleanup, onMount } from 'solid-js'
import Chessboard from './Chessboard'
import Chesstree2, { Treelala2 } from './Chesstree2'
import './Home.scss'
import { Shala } from './Shalala'
import StudyRepo, { PGNStudy } from './studyrepo'
import { opposite } from 'chessops'
import { usePlayer } from './sound'
import ProfileStore, { UserRun, UserSetRunStore, get_attempted_for_run } from './profile_store'
import { format_ms_time } from './util'
import SessionStore from './session_store'

const analyze_lichess_fen_link = (fen: string) => {
    fen = fen.replace(' ', '_')
    return `https://lichess.org/analysis/${fen}`
}

const Home = () => {

    let username = ProfileStore.active_user ?? ProfileStore.anonymous_user

    const [active_run] = createResource<UserRun>(() => UserSetRunStore.get_or_create_active_run_for_user(username))

    const set_id = createMemo(() => active_run()?.set_id)

    const [pgn] = createResource(set_id, set_id => StudyRepo.get_study_by_id(set_id))

    return (<>
        <Show when={pgn.loading} fallback={
            <Show when={pgn.error} fallback={
                <Show when={!!pgn() && !!active_run()}>{
                    <HomeLoaded pgn={pgn()!} run={active_run()!} />
                }</Show>
            }>{
                <span>Failed loading PGNs..</span>
            }</Show>
        }>
            <span>Loading...</span>
        </Show>
    </>)
}

export type SetFilter = 'solved' | 'failed' | 'skipped' | 'unseen'

const HomeLoaded = (props: { pgn: PGNStudy, run: UserRun }) => {

    let username = ProfileStore.active_user ?? ProfileStore.anonymous_user
    const [current_run, set_current_run] = createSignal(props.run, { equals: false })
    const pgn = () => props.pgn


    const [resizable, set_resizable] = createSignal(true)

    const hide_first = () => pgn().hide_first
    const random_line = () => pgn().random_line

    let tick_interval: number
    const [elapsed_ms, set_elapsed_ms] = createSignal(0)


    const [filter, set_filter] = createSignal<SetFilter | undefined>(SessionStore.navigate_filter)
    SessionStore.navigate_filter = undefined

    const all_puzzles = createMemo(() => [...Array(props.pgn.chapters.length).keys()])
    const solved_puzzles = () => current_run().solved
    const failed_puzzles = () => current_run().failed
    const skipped_puzzles = () => current_run().skipped
    const unattempted_puzzles = createMemo(() => {
        let attempted = [
            ...solved_puzzles(),
            ...failed_puzzles(),
            ...skipped_puzzles()]
        return all_puzzles().filter(_ => !attempted.includes(_))
    })
    const filtered_puzzles = createMemo(() => {
        let f = filter()

        if (f === 'failed') {
            return failed_puzzles()
        } else if (f === 'skipped') {
            return skipped_puzzles()
        } else if (f === 'solved') {
            return solved_puzzles()
        } else if (f === 'unseen') {
            return unattempted_puzzles()
        }
    })

    const in_run = createMemo(() => filter() === undefined)

    const Player = usePlayer()
    const [is_jump_to_next_puzzle_immediately, set_is_jump_to_next_puzzle_immediately] = createSignal(false)

    const [is_pending, set_is_pending] = createSignal(false)
    const [is_view_solution, set_is_view_solution] = createSignal(false)

    let f_p = filtered_puzzles()
    const [i_chapter_index, set_i_chapter_index] = createSignal<number | undefined>(f_p ? f_p[0] : unattempted_puzzles()[0])
    const selected_chapter = createMemo(() => props.pgn.chapters[i_chapter_index() ?? 0])

    const lichess_link = () => selected_chapter().site ?? analyze_lichess_fen_link(selected_chapter().pgn.tree.before_fen)

    const shalala = new Shala()
    const puzzle_lala = createMemo(on(selected_chapter, (chapter) => {
        let res = Treelala2.make(chapter.pgn.tree.clone)

        if (hide_first()) {
          res.tree!.root.map(_ => _.data.path).forEach(_ => res._hidden_paths.add_path(_))
        } else {
          res.tree!.root[0].children.map(_ => _.data.path).forEach(_ => res._hidden_paths.add_path(_))
        }
        shalala.on_set_fen_uci(res.initial_fen)

        set_is_view_solution(false)
        set_elapsed_ms(0)

      setTimeout(() => {
        if (hide_first()) {
          res.cursor_path = []
        } else {
          res.cursor_path = res.tree!.root[0].data.path
        }
        set_is_view_solution(true)

        clearInterval(tick_interval)
        tick_interval = setInterval(() => set_elapsed_ms(elapsed_ms() + 1000), 1000)
      }, 600)

      return res
    }))

    createEffect(on(in_run, (v) => {
        set_elapsed_ms(0)
        clearInterval(tick_interval)
        if (v) {
            tick_interval = setInterval(() => set_elapsed_ms(elapsed_ms() + 1000), 1000)
        }
    }))


    createEffect(on(() => shalala.add_uci, (uci?: string) => {
        if (!uci) {
            return
        }

        let success = puzzle_lala().try_next_uci_fail(uci)

        if (success) {
            set_is_pending(true)
            setTimeout(() => {
                if (random_line()) {
                  puzzle_lala().reveal_one_random()
                } else {
                  puzzle_lala().reveal_from_mainline()
                }
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

    const on_next_puzzle = () => {
        set_resizable(false)
        
        let i = i_chapter_index()
        if (i === undefined) {
            return
        }

        let p = filtered_puzzles()
        if (p) {
          i = p[p.indexOf(i) + 1]
        } else {
            i = i + 1
        }
        if (i >= props.pgn.chapters.length) {
            set_i_chapter_index(undefined)
        } else {
            set_i_chapter_index(i)
        }
    }
    const on_view_solution = () => {
        if (!is_view_solution()) {
            return false
        }
        puzzle_lala().reveal_hidden_paths()
    }

    createEffect(on(() => puzzle_lala().is_revealed, (v) => {
        if (v) {
            puzzle_lala().reveal_hidden_paths()
        }
    }))


    let reveal_result = createMemo(on(() => puzzle_lala().is_revealed, (is_revealed) => {
        if (!in_run()) {
            return 'not_in_run'
        }
        if (is_revealed) {
            let failed = puzzle_lala().failed_paths_expanded.length > 0
            let revealed = puzzle_lala().revealed_paths_expanded.length > 0

            if (failed) {
                return 'failed'
            } 

            let last_solved = puzzle_lala().solved_paths_expanded.pop()
            if (last_solved) {
                if (puzzle_lala().tree?.get_children(last_solved)?.length === 0) {
                    return 'solved'
                }
            }

            if (revealed) {
                return 'revealed'
            } else {
                return 'solved'
            }
        }
        return 'thinking'
    }))

    createEffect(() => {
        if (reveal_result() === 'solved' && is_jump_to_next_puzzle_immediately()) {
            set_is_pending(true)
            setTimeout(() => {
                on_next_puzzle()
                set_is_pending(false)
            }, 600)
        }
    })



    createEffect(on(reveal_result, r => {

        if (r === 'not_in_run' || r === 'thinking') {
            return
        }

        let i = i_chapter_index()!
        let run = current_run()
        if (r === 'failed') {
            run.failed.push(i)
        } else if (r === 'revealed') {
            run.skipped.push(i)
        } else if (r === 'solved') {
            run.solved.push(i)
        }

        run.elapsed_ms += elapsed_ms()
        UserSetRunStore._save_run(run)
        clearInterval(tick_interval)
        set_current_run(run)
    }))

    createEffect(on(() => puzzle_lala().tree?.get_at(puzzle_lala().cursor_path), (v) => {
        if (v) {
            Player.move(v)
        }
    }))

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

    const turn_to_play = createMemo(() => {
        let res = puzzle_lala().initial_color!
        if (hide_first()) {
            return res
        } else {
            return opposite(res)
        }
    })

    const turn_to_orientation = createMemo(() => {
        let res = puzzle_lala().initial_color ?? 'white'

        if (hide_first()) {

            return res
        } else {
            return opposite(res)
        }
    })


    const puzzle_span_klass_for = (i: number) => {
        
        let skipped = createMemo(() => skipped_puzzles().includes(i))
        let solved = createMemo(() => solved_puzzles().includes(i))
        let failed = createMemo(() => failed_puzzles().includes(i))
        let current = createMemo(() => i === i_chapter_index())

        const filtered = createMemo(() => filtered_puzzles()?.includes(i))

        let res = createMemo(() => current() ? 'current' : skipped() ? 'skipped' : solved() ? 'solved' : failed() ? 'failed': '')

        return [
            filtered() ? 'filtered' : '',
            res()
        ].join(' ')
    }

    const set_filter_and_change_i = (_: string) => {
        set_filter(_ === '' ? undefined : _ as SetFilter)

        let p = filtered_puzzles()
        if (p) {
            set_i_chapter_index(p[0])
        } else {
            set_i_chapter_index(unattempted_puzzles()[0])
        }
    }
    const set_filter_for_index = (i: number) => {
        let skipped = skipped_puzzles().includes(i)
        let solved = solved_puzzles().includes(i)
        let failed = failed_puzzles().includes(i)

        if (skipped) {
            set_filter('skipped')
        } else if (solved) {
            set_filter('solved')
        } else if (failed) {
            set_filter('solved')
        } else {
            set_filter('unseen')
        }
    }

    const puzzle_title = () => {
        let f = filter()

        if (f === 'failed') {
            return 'Failed'
        } else if (f === 'skipped') {
            return 'Skipped'
        } else if (f === 'solved') {
            return 'Solved'
        } else if (f === 'unseen') {
            return 'Unseen'
        }

        return 'All'
    }


    let [waiting_new_run, set_waiting_new_run] = createSignal(false)
    const start_a_new_run = async () => {
        set_waiting_new_run(true)
        let res = await UserSetRunStore.start_new_run(username)

        batch(() => {
          set_waiting_new_run(false)
          set_current_run(res)
          set_i_chapter_index(0)
        })
    }

    return (<>
        <div ref={_ => el_sixth = _} class='home'>

            <div class='board-wrap'>
                <Chessboard
                    resizable={resizable()}
                    orientation={turn_to_orientation()}
                    movable={i_chapter_index() !== undefined && !is_pending() && !puzzle_lala().is_revealed && puzzle_lala().is_next_hidden_cursor_path}
                    endPendingPromotion={shalala.on_promotion_end}
                    pendingPromotion={shalala.uci_pending_promotion_color_dest}
                    doPromotion={shalala.promotion}
                    onMoveAfter={shalala.on_move_after}
                    fen_uci={shalala.fen_uci}
                    color={shalala.turnColor}
                    dests={shalala.dests} />


            </div>
            <div class='replay-wrap'>
                <div class='replay'>
                    <div class='replay-header'>
                        <Show when={i_chapter_index() !== undefined} fallback={
                            <span> There are no {puzzle_title()} Puzzles </span>
                        }>
                            <span>#{i_chapter_index()! + 1}</span>
                            <span>{puzzle_title()} Puzzles</span>
                        </Show>
                        <span><a href={lichess_link()}>lichess</a></span>
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
                        <Show when={i_chapter_index() !== undefined} fallback={
                            <div class='info'>
                               <Show when={in_run()} fallback={
                                <>
                                 <span> There are no {puzzle_title()} Puzzles </span>
                                 <button onClick={() => set_filter_and_change_i('') }>Go back to Run</button>
                                </>
                               }>
                                <>
                                 <span> You've finished a Run. </span>

                                 <div class='end-stats'>
                                     <div class='out'>
                                       <span onClick={() => set_filter_and_change_i('solved')} class='solved'>Solved: {current_run().solved.length}/{get_attempted_for_run(current_run())}</span>
                                       <span onClick={() => set_filter_and_change_i('failed')} class='failed'>Failed: {current_run().failed.length}/{get_attempted_for_run(current_run())}</span>
                                       <span onClick={() => set_filter_and_change_i('skipped')} class='skipped'>Skipped: {current_run().skipped.length}/{get_attempted_for_run(current_run())} </span>
                                     </div>
                                     <span>Time Spent: {format_ms_time(current_run().elapsed_ms)} </span>
                                 </div>
 

                                <Show when={!waiting_new_run()}>
                                   <button onClick={() => start_a_new_run() }>Start a New Run</button>

                                </Show>
                                </>
                               </Show>
                            </div>
                        }>

                        <Show when={puzzle_lala().is_revealed} fallback={
                            <>
                                <div class='info'>
                                    <h3><span class='turn'>{turn_to_play()}</span> to play</h3>
                                    <span>Find the best move for {turn_to_play()}</span>
                                    <Show when={in_run()}>
                                        <h4>{format_ms_time(elapsed_ms(), false)}</h4>
                                    </Show>
                                </div>
                                <span onClick={() => on_view_solution()} class={'solution' + (is_view_solution() ? '' : ' fade-out')}>View Solution</span>
                            </>
                        }>
                            <>
                                <h3>Puzzle Completed!</h3>
                                <Show when={in_run()}>
                                   <h4>{format_ms_time(elapsed_ms(), false)}</h4>
                                </Show>
                                <Switch>
                                    <Match when={reveal_result() === 'solved'}>
                                        <span class='success'>solved +1</span>
                                    </Match>
                                    <Match when={reveal_result() === 'failed'}>
                                        <span class='success'>failed +1</span>
                                    </Match>
                                    <Match when={reveal_result() === 'revealed'}>
                                        <span class='success'>skipped +1</span>
                                    </Match>
                                </Switch>

                                <Show when={!(is_jump_to_next_puzzle_immediately() && reveal_result() === 'solved')}>
                                    <span onClick={() => on_next_puzzle()} class='link'>Continue with next puzzle.</span>
                                </Show>
                            </>
                        </Show>
                        </Show>
                    </div>
                </div>
            </div>
            <div class='side'>
                <div class='side-header'>
                    <span class='title'>Set: {pgn().name}</span>
                    <span class='run'>Run: #{current_run().no}</span>
                    <span class='time'>Total Time: {format_ms_time(current_run().elapsed_ms)}</span>
                </div>
                <div class='side-info'>
                    <span class='event'>Event: {selected_chapter().pgn.event}</span>
                    <div class='players'>
                      <div class='color-icon white'>{selected_chapter().pgn.white}</div>
                      <div class='color-icon black'>{selected_chapter().pgn.black}</div>
                    </div>
                </div>
                <div class='side-tools'>
                    <div class='jump-toggle'>
                      <input onChange={_ => set_is_jump_to_next_puzzle_immediately(_.currentTarget.checked)} type='checkbox' id='jump-next' checked={is_jump_to_next_puzzle_immediately()}></input>
                      <label for='jump-next'>Jump to next puzzle immediately</label>
                    </div>
                    <div class='show-dropdown'>
                        <label for='show-only'>Show Only</label> 
                        <select value={filter() === undefined ? '' : filter()} onChange={_ => set_filter_and_change_i(_.currentTarget.value) } id='show-only'>
                            <option value=''>Normal Run</option>
                            <option value='solved'>Solved Puzzles</option>
                            <option value='unseen'>Unseen Puzzles</option>
                            <option value='failed'>Failed Puzzles</option>
                            <option value='skipped'>Skipped Puzzles</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class='under'>
                <div class='side-list'>
                    <For each={all_puzzles()}>{i => 
                      <span class={puzzle_span_klass_for(i)} onClick={() => { set_filter_for_index(i); set_i_chapter_index(i) }}>{i+1}</span> 
                    }</For>
                </div>
            </div>
        </div>
    </>)
}

export default Home