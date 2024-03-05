import { Pgn } from "./chess_pgn_logic"

export type PGNStudy = {
    name: string,
    chapters: PGNChapter[]
}

export type PGNChapter = {
    site?: string,
    pgn: Pgn
}


const reformatStudyPGN = (pgns: string, study_name: string): PGNStudy => {
    let chapters = Pgn.make_many(pgns).map(pgn => {
        let site = pgn.puzzle && `https://lichess.org/tactics/${pgn.puzzle}`

        return {
            site,
            pgn
        }

    })

    return {
        name: study_name,
        chapters
    }
}


const read_study_config = () =>
fetch(`pgns/config.txt`).then(_ =>  _.text()).then(_ => parse_config(_))

const read_study_pgn = (id: string, study_name: string) => 
    fetch(`pgns/${id}.pgn`).then(_ => _.text()).then(_ => reformatStudyPGN(_, study_name))

export type StudyInConfig = {
  id: string,
  name: string,
}

const parse_config = (_: string): StudyInConfig[] => {
  return _.split('\n').map(_ => {

    let m = _.match(/(\w*) "([^"]*)"/)!

    let [__, id, name] = m

    return { id, name }
  })
}


class StudyRepo {

  config?: StudyInConfig[]

  cache: Map<string, PGNStudy> = new Map()

  async get_list_of_studies() {
    if (!this.config) {
      this.config = await read_study_config()
    }

    return this.config!
  }

  async get_study_by_id(id: string) {

    if (!this.config) {
      this.config = await read_study_config()
    }

    if (!this.cache.get(id)) {

      let { name } = this.config!.find(_ => _.id === id)!

      let study = await read_study_pgn(id, name)
      this.cache.set(id, study)
    }

    return this.cache.get(id)!
  }
}


export default new StudyRepo()