import { For, Match, Show, Switch, createEffect, createMemo, createResource, createSignal, on, onCleanup, onMount } from 'solid-js'
import Chessboard from './Chessboard'
import Chesstree2, { Treelala2 } from './Chesstree2'
import './Home.scss'
import { Shala } from './Shalala'
import StudyRepo, { PGNStudy } from './studyrepo'
import { opposite } from 'chessops'
import { usePlayer } from './sound'
import ProfileStore, { UserRun, UserSetRunStore } from './profile_store'
import { format_ms_time } from './util'

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

const HomeLoaded = (props: { pgn: PGNStudy, run: UserRun }) => {

    const [current_run, set_current_run] = createSignal(props.run, { equals: false })
    const pgn = () => props.pgn

    let tick_interval: number
    const [elapsed_ms, set_elapsed_ms] = createSignal(0)


    const all_puzzles = createMemo(() => [...Array(props.pgn.chapters.length).keys()])
    const solved_puzzles = createMemo(() => current_run().solved)
    const failed_puzzles = createMemo(() => current_run().failed)
    const skipped_puzzles = createMemo(() => current_run().skipped)
    const unattempted_puzzles = createMemo(() => {
        let attempted = [
            ...solved_puzzles(),
            ...failed_puzzles(),
            ...skipped_puzzles()]
        return all_puzzles().filter(_ => !attempted.includes(_))
    })

    const Player = usePlayer()
    const [is_jump_to_next_puzzle_immediately, set_is_jump_to_next_puzzle_immediately] = createSignal(false)

    const [is_pending, set_is_pending] = createSignal(false)
    const [is_view_solution, set_is_view_solution] = createSignal(false)

    const [i_chapter_index, set_i_chapter_index] = createSignal(unattempted_puzzles()[0])
    const selected_chapter = createMemo(() => props.pgn.chapters[i_chapter_index()])

    const shalala = new Shala()
    const puzzle_lala = createMemo(on(selected_chapter, (chapter) => {
        let res = Treelala2.make(chapter.pgn.tree)

      res.tree!.root.children.map(_ => _.data.path).forEach(_ => res._hidden_paths.add_path(_))
        shalala.on_set_fen_uci(res.initial_fen)

        set_is_view_solution(false)
        set_elapsed_ms(0)

      setTimeout(() => {
        res.cursor_path = res.tree!.root.data.path
        set_is_view_solution(true)

        clearInterval(tick_interval)
        tick_interval = setInterval(() => set_elapsed_ms(elapsed_ms() + 1000), 1000)
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


    let reveal_result = createMemo(() => {
        if (puzzle_lala().is_revealed) {
            let failed = puzzle_lala().failed_paths_expanded.length > 0
            let revealed = puzzle_lala().revealed_paths_expanded.length > 0


            if (failed) {
                return 'failed'
            } else if (revealed) {
                return 'revealed'
            } else {
                return 'solved'
            }
        }
        return 'thinking'
    })


    createEffect(on(reveal_result, r => {
        let i = i_chapter_index()
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


    const puzzle_span_klass_for = (i: number) => {
        
        let skipped = createMemo(() => skipped_puzzles().includes(i))
        let solved = createMemo(() => solved_puzzles().includes(i))
        let failed = createMemo(() => failed_puzzles().includes(i))
        let current = createMemo(() => i === i_chapter_index())

        return current() ? 'current' : skipped() ? 'skipped' : solved() ? 'solved' : failed() ? 'failed': ''
    }

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
                        <span>#{i_chapter_index()+1}</span>
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
                                    <h4>{format_ms_time(elapsed_ms(), false)}</h4>
                                </div>
                                <span onClick={() => on_view_solution()} class={'solution' + (is_view_solution() ? '' : ' fade-out')}>View Solution</span>
                            </>
                        }>
                            <>
                                <h3>Puzzle Completed!</h3>
                                <h4>{format_ms_time(elapsed_ms(), false)}</h4>
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
                    <span class='title'>Set: {pgn().name}</span>
                    <span class='run'>Run: #{current_run().no}</span>
                    <span class='time'>Total Time: {format_ms_time(current_run().elapsed_ms)}</span>
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
                    <For each={all_puzzles()}>{i => 
                      <span class={puzzle_span_klass_for(i)} onClick={() => set_i_chapter_index(i)}>{i+1}</span> 
                    }</For>
                </div>
            </div>
        </div>
    </>)
}

export default Home