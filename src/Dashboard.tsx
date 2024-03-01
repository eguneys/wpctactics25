import { A, useNavigate } from '@solidjs/router'
import './Dashboard.scss'
import ProfileStore from './profile_store'
import { Show } from 'solid-js'
import throttle from './common/throttle'
import { usePlayer } from './sound'


const Dashboard = () => {

    const Player = usePlayer()
    const navigate = useNavigate()

    const on_change_profile = () => {
        navigate('/profile')
    }

    const on_clear_stats = () => {

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

    return (<>
    <div class='dashboard'>
        <div class='puzzle-list'>
                <h2>Puzzle Sets</h2>
                <ul>
                    <li class='active'><span>Tactics U1600</span></li>
                    <li><span>Tactics U2000</span></li>
                    <li><span>Tactics U2200</span></li>
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
                <span>Tactics U1600 Statistics</span>
            </div>
            <div class='body'>

                <div class='title'>
                  <span> Total Runs: 2 </span>
                  <div class='runs'><span> Run #1 </span></div>
                </div>

                <div class='progress'>Progress Bar</div>

                <div class='info'>
                    <span>Attempted: 10/50</span>
                    <div class='out'>
                      <span class='solved'>Solved: 1/10</span>
                      <span class='failed'>Failed: 1/10</span>
                      <span class='skipped'>Skipped: 8/10</span>
                    </div>
                    <span>Time Spent: 01:30:00 </span>
                </div>
            
            <div class='buttons'>
                <span class='link red'>Clear Statistics</span>
            </div>
            </div>
        </div>
    </div>
    </>)
}


export default Dashboard