import { useNavigate } from '@solidjs/router'
import './Profile.scss'
import ProfileStore from './profile_store'
import { For, createSignal } from 'solid-js'

const Profile = () => {

    const navigate = useNavigate()

    const go_to_profile = () => {
        navigate('/dashboard')
    }

    const [username_input, set_username_input] = createSignal<string | undefined>()

    return (<>
    <div class='profile'>
        <div class='list'>
            <h1> Welcome </h1>
            <div class='scroll'>
              <ul>
                  <li onClick={() => {
                    ProfileStore.change_profile(undefined)
                    go_to_profile()
                  }} class='unsaved'> <span>Unsaved</span> </li>
                  <For each={ProfileStore.user_list}>{ (user: string) =>
                    <li onClick={() => {
                         ProfileStore.change_profile(user)
                         go_to_profile() } } > <span>{user}</span> </li>
                  }</For>
              </ul>
            </div>
        </div>
        <div class='save'>
            <form>
            <h4>Save New Profile</h4>
            <input required minLength={3} maxLength={13} onChange={_ => set_username_input(_.currentTarget.value)} type='text' placeholder='Profile Name'></input>
            <button onClick={() => {
                let i = username_input()
                if (i && i.length >= 3) {
                   ProfileStore.save_new_profile(i)
                   go_to_profile()
                }
            }}>Save</button>
            </form>
        </div>
    </div>
    </>)
}


export default Profile