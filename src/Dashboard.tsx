import './Dashboard.scss'


const Dashboard = () => {
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
                <span class='link'>Change Profile</span>
                <span class='link red'>Clear Statistics</span>
                <span class='link red'>Delete Profile</span>
            </div>
            </div>
        <div class='stats'>
            <div class='header'>
                <span class='link'>Save Profile</span>
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