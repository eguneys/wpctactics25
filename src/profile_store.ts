import { makePersisted } from "@solid-primitives/storage"
import { Signal, batch, createSignal } from "solid-js"

const def_user_list: string[] = []

class ProfileStore {

    _active_user: Signal<string | undefined> = makePersisted(createSignal(), {
        name: '.wpc.profile.active_user'
    })

    _user_list: Signal<string[]> = makePersisted(createSignal(def_user_list, { equals: false }), {
        name: '.wpc.profile.user_list'
    })

    get active_user() {
        return this._active_user[0]()
    }

    set active_user(_: string | undefined) {
        this._active_user[1](_)
    }

    get user_list() {
        return this._user_list[0]()
    }

    set user_list(_: string[]) {
        this._user_list[1](_)
    }


    save_new_profile(name: string) {
        let l = this.user_list
        l = l.filter(_ => _ !== name)
        l.push(name)
        batch(() => {
          this.user_list = l
          this.active_user = name
        })
    }


    delete_active_profile() {
        let name = this.active_user
        let l = this.user_list
        l = l.filter(_ => _ !== name)
        batch(() => {
          this.active_user = undefined
          this.user_list = l
        })
    }


    change_profile(name: string | undefined) {
        this.active_user = name
    }
}


export default new ProfileStore()