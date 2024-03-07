import { makePersisted } from "@solid-primitives/storage"
import { Signal, batch, createSignal } from "solid-js"
import StudyRepo from './studyrepo'

const gen_run_id = () => `run-${Math.random().toString(16).slice(2)}`

const def_user_list: string[] = []

class ProfileStore {

    anonymous_user: string = `Anonymous`

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



export type UserRun = {
    id: string,
    set_id: string,
    username: string,
    no: number,
    total: number,
    solved: number[],
    failed: number[],
    skipped: number[],
    elapsed_ms: number,
    ended?: boolean
}

export function get_attempted_for_run(run: UserRun) {
    return run.solved.length + run.failed.length + run.skipped.length
}

export type UserActiveConfig = {
    username: string,
    active_set: string
}

const def_user_run_list: UserRun[] = []
const def_user_active_config_list: UserActiveConfig[] = []

class _UserSetRunStore {
    _user_active_config_list: Signal<UserActiveConfig[]> = makePersisted(createSignal(def_user_active_config_list, { equals: false }), {
        name: '.wpc.profile.user_active_config_list'
    })

    get user_active_config_list() {
        return this._user_active_config_list[0]()
    }

    set user_active_config_list(_: UserActiveConfig[]) {
        this._user_active_config_list[1](_)
    }

    _user_run_list: Signal<UserRun[]> = makePersisted(createSignal(def_user_run_list, { equals: false }), {
        name: '.wpc.profile.user_run_list'
    })

    get user_run_list() {
        return this._user_run_list[0]()
    }

    set user_run_list(_: UserRun[]) {
        this._user_run_list[1](_)
    }

    get_runs_for_user(username: string, set_id: string) {
        return this.user_run_list.filter(_ => _.username === username && _.set_id === set_id)
    }

    get_active_run_for_user(username: string) {
        let cc = this.user_active_config_list.find(_ => _.username === username)

        let ll = this.user_run_list.filter(_ => _.username === username && (!cc || _.set_id === cc.active_set))

        return ll[ll.length - 1]
    }

    get_active_config_for_user(username: string) {
        let ll = this.user_active_config_list

        return ll.find(_ => _.username === username)
    }

    set_active_config_for_user(username: string, set_id: string) {
        let ll = this.user_active_config_list

        let c = ll.find(_ => _.username)

        if (!c) {
            let res = { username, active_set: set_id }
            ll.push(res)

            this.user_active_config_list = ll
            return res
        } else {
            c.active_set = set_id
            this.user_active_config_list = ll
            return c
        }

    }

    async get_or_create_active_config_for_user(username: string) {
        let res = this.get_active_config_for_user(username)

        if (!res) {
            let set_id = (await StudyRepo.get_list_of_studies())[0].id

            return this.set_active_config_for_user(username, set_id)
        } else {
            return res
        }


    }

    async get_or_create_active_run_for_user(username: string) {

        let res = this.get_active_run_for_user(username)
        if (!res) {

            let config = await this.get_or_create_active_config_for_user(username)
            let set_id = config.active_set

            let study = await StudyRepo.get_study_by_id(set_id)
            let total = study.chapters.length

            
            let runs = this.get_runs_for_user(username, set_id)

            res = {
                id: gen_run_id(),
                no: runs.length + 1,
                set_id,
                username,
                solved: [],
                failed: [],
                skipped: [],
                elapsed_ms: 0,
                total
            }
            this._save_run(res)
        }
        return res
    }

    clear_all_runs(username: string) {
        let l = this.user_run_list
        l = l.filter(_ => _.username !== username)
        this.user_run_list = l
    }


    clear_runs(username: string, set_id: string) {
        let l = this.user_run_list
        l = l.filter(_ => !(_.username === username && _.set_id == set_id))
        this.user_run_list = l
    }


    _save_run(run: UserRun) {
        let l = this.user_run_list
        l = l.filter(_ => _.id !== run.id)
        l.push(run)
        this.user_run_list = l
    }

    delete_runs_for_user(username: string) {
        let l = this.user_run_list

        l = l.filter(_ => _.username !== username)
        this.user_run_list = l


        let c = this.user_active_config_list
        c = c.filter(_ => _.username !== username)
        this.user_active_config_list = c
    }

    delete_runs_for_set(username: string, set_id: string) {
        let l = this.user_run_list
        l = l.filter(_ => !(_.username === username && _.set_id === set_id))
        this.user_run_list = l
    }
}

export const UserSetRunStore =  new _UserSetRunStore()