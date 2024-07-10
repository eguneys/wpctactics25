import { A, useNavigate } from '@solidjs/router'
import './Dashboard.scss'
import ProfileStore, { UserSetRunStore, UserActiveConfig, get_attempted_for_run } from './profile_store'
import { For, Show, createEffect, createMemo, createResource, createSignal, on } from 'solid-js'
import throttle from './common/throttle'
import { usePlayer } from './sound'
import StudyRepo, { StudyInConfig } from './studyrepo'
import { format_ms_time } from './util'
import { SetFilter } from './Home'
import SessionStore from './session_store'

const Dashboard = () => {

    let username = ProfileStore.active_user ?? ProfileStore.anonymous_user

    let [studies] = createResource(() => StudyRepo.get_list_of_studies())

    const [active_config] = createResource(() => UserSetRunStore.get_or_create_active_config_for_user(username))

    return (<>
    <Show when={!(studies.loading || active_config.loading) && !!studies() && !!active_config()} fallback={
        <span>Loading..</span>
    }>
        <DashboardLoaded config={active_config()!} studies={studies()!}/>
    </Show>
    </>)

}

const DashboardLoaded = (props: { config: UserActiveConfig, studies: StudyInConfig[] }) => {

    const username = () => ProfileStore.active_user ?? ProfileStore.anonymous_user
    const [active_set, set_active_set] = createSignal(props.config.active_set)
    const studies = () => props.studies


    const [selected_study_id, set_selected_study_id] = createSignal(active_set())

    const selected_study = createMemo(() => studies().find(_ => _.id === selected_study_id())!)

    const runs = () => UserSetRunStore.get_runs_for_user(username(), selected_study_id())
    const [i_selected_run, _set_i_selected_run] = createSignal(0)
    const current_run = createMemo(() => {
        let r = runs()
        return r[r.length - 1 - i_selected_run()]
    })

    const Player = usePlayer()
    const navigate = useNavigate()

    createEffect(on(active_set, set_id => {
        UserSetRunStore.set_active_config_for_user(username(), set_id)
    }))

    const on_change_profile = () => {
        navigate('/profile')
    }

    const on_clear_stats = () => {
        UserSetRunStore.clear_all_runs(username())
    }

    const on_delete_profile = () => {
        let s = window.confirm('Do you want to delete your profile?')
        if (s) {
            ProfileStore.delete_active_profile()
            navigate('/profile')
        }
    }

    const setVolume = throttle(150, (v: number) => {
        Player.setVolume(v)
        Player.play('move')
    })


    const set_as_active_study = () => {
        set_active_set(selected_study_id())
    }

    const start_a_new_run = () => {
        set_active_set(selected_study_id())
        UserSetRunStore.get_or_create_active_run_for_user(username())
    }

    const clear_runs = () => {
        UserSetRunStore.clear_runs(username(), selected_study_id())
    }

    const show_export_failed_puzzles = createSignal(false)

    createEffect(on(selected_study_id, () => {
        show_export_failed_puzzles[1](false)
    }))

    SessionStore.navigate_filter = undefined
    const set_filter_and_navigate = (filter: SetFilter) => {

        SessionStore.navigate_filter = filter
        navigate('/')

    }

    return (<>
    <div class='dashboard'>
        <div class='puzzle-list'>
                <h2>Puzzle Sets</h2>
                <ul>
                    <For each={studies()}>{ study =>
                      <li onClick={() => set_selected_study_id(study.id) } class={selected_study_id() === study.id ? 'active': ''}><span>{study.name}</span> 
                      
                      <Show when={study.id === active_set()}>
                        <span> active </span>
                      </Show>
                      </li>
                    }</For>
                </ul>

        </div>
        <div class='settings'>
            <h2>Settings</h2>
            <div class='links'>
                <span onClick={() => on_change_profile()} class='link'><A href='/profile'>Change Profile</A></span>
                <div class='volume'><label>Volume</label><input value={Player.getVolume()} onInput={(e) => setVolume(parseFloat(e.currentTarget.value))} min={0} max={1} step={0.1} type='range'></input></div>
                <span onClick={() => on_clear_stats()} class='link red'>Clear Statistics</span>
                <span onClick={() => on_delete_profile()} class='link red'>Delete Profile</span>
            </div>
            </div>
        <div class='stats'>
            <div class='header'>
                    <Show when={ProfileStore.active_user} fallback={
                        <span class='link'> <A href='/profile'>Save Profile</A> </span>
                    }>{ user => 
                        <span>{user()}</span>
                    }</Show>
                <span>{selected_study().name} Statistics</span>
            </div>
            <div class='body'>

            <Show when={current_run()} keyed fallback={
                <>
                <span> There are no runs on this set. </span>
                <div class='buttons'>
                    <button onClick={() => start_a_new_run()}>Start a New Run</button>
                </div>
                        </>
            }>{ current_run =>
            <>
                <div class='buttons'>
                    <Show when={selected_study().id !== active_set()}>
                      <button onClick={() => set_as_active_study()}>Set Active</button>
                    </Show>
                    <button onClick={() => { set_as_active_study(); navigate('/') }}>Start Solving</button>
                </div>
                <div class='title'>
                  <span> Total Runs: {runs().length} </span>
                  <div class='runs'><span> Run #{i_selected_run() + 1} </span></div>
                </div>

                <div class='progress'>
                
                   <div class='progress-bar'>
                      <span class='solved' style={`width: ${(current_run.solved.length / current_run.total) * 100}%;`}> </span>
                      <span class='failed' style={`width: ${(current_run.failed.length / current_run.total) * 100}%;`}> </span>
                      <span class='skipped' style={`width: ${(current_run.skipped.length / current_run.total) * 100}%;`}> </span>
                   </div>
                </div>

                <div class='info'>
                    <span>Attempted: {get_attempted_for_run(current_run)}/{current_run.total}</span>
                    <div class='out'>
                      <span onClick={() => set_filter_and_navigate('solved') } class='solved'>Solved: {current_run.solved.length}/{get_attempted_for_run(current_run)}</span>
                      <span onClick={() => set_filter_and_navigate('failed') } class='failed'>Failed: {current_run.failed.length}/{get_attempted_for_run(current_run)}</span>
                      <span onClick={() => set_filter_and_navigate('skipped') } class='skipped'>Skipped: {current_run.skipped.length}/{get_attempted_for_run(current_run)} </span>
                    </div>
                    <span>Time Spent: {format_ms_time(current_run.elapsed_ms)} </span>
                </div>
            
            <div class='buttons'>
                <Show fallback={
                  <span onClick={() => show_export_failed_puzzles[1](true)} class='link'>Export Failed Puzzles</span>
                } when={show_export_failed_puzzles[0]()}>
                    <ExportFailedLink selected_study={selected_study()}/>
                </Show>
                <span onClick={() => clear_runs()} class='link red'>Clear Statistics</span>
            </div>
                        </>
            }</Show>
            </div>

        </div>
    </div>
    </>)
}

const ExportFailedLink = (props: { selected_study: StudyInConfig }) => {

    const username = () => ProfileStore.active_user ?? ProfileStore.anonymous_user
    let [failed_pgns] = createResource(() => UserSetRunStore.get_failed_puzzles_for_selected_study_in_pgn_for_user(username(), props.selected_study.id))

    let href = createMemo(on(failed_pgns, pgns => { 
        if (pgns === undefined) {
            return undefined
        }  
        return URL.createObjectURL(new Blob([pgns], { type: 'text/plain'}))
    }))
    let download = createMemo(() => `${props.selected_study.name}-failed.pgn`)


    return (<>
    <Show fallback="Composing pgns.." when={href()}>{ href => 
      <a href={href()} download={download()}>Click to download failed puzzles</a>
    }</Show>
    </>)
}

export default Dashboard