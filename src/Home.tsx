import { createMemo, createResource, createSignal, on } from 'solid-js'
import Chessboard from './Chessboard'
import Chesstree2, { Treelala2 } from './Chesstree2'
import './Home.scss'
import { Shala } from './Shalala'
import StudyRepo, { PGNStudy } from './studyrepo'
import { useParams } from '@solidjs/router'


const Home = () => {

    const params = useParams()
    let id = params.id

    const [pgn] = createResource('u1600', StudyRepo.read_study)

    return (<>

<Show when={pgn.loading} fallback={
    <HomeLoaded pgn={pgn()}/>
}>
    <span>Loading...</span>
</Show>
    </>)
}

const HomeLoaded = (props: { pgn: PGNStudy }) => {

    const [i_chapter_index, set_i_chapter_index] = createSignal(0)
    const selected_chapter = createMemo(() => props.pgn.chapters[i_chapter_index()])

    const shalala = new Shala()
    const puzzle_lala = createMemo(on(selected_chapter, (chapter) => {
        let res = Treelala2.make(chapter.pgn.tree)

      res.cursor_path = res.tree!.root.data.path
      res.tree!.root.children.map(_ => _.data.path).forEach(_ => res._hidden_paths.add_path(_))

      return res
    }))

    return (<>
        <div class='home'>

            <div class='board-wrap'>
                <Chessboard
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
                    <div class='replay-tools'>
                        <div class='info'>
                            <h3>White to play</h3>
                            <span>Find the best move for white</span>
                        </div>
                        <span class='solution'>View Solution</span>
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
                    <div>
                      <input type='checkbox' id='jump-next'></input>
                      <label for='jump-next'>Jump to next puzzle immediately</label>
                    </div>
                    <div>
                        <label for='show-only'>Show Only</label> 
                        <select id='show-only'>
                            <option value='failed'>Solved Puzzles</option>
                            <option value='failed'>Regular Puzzles</option>
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