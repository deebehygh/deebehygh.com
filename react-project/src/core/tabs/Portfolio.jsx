import { portfolio_data } from "../../data/portfolio-data";
import '../css/Portfolio.css'

export function PortfolioList() {
    const p_list = portfolio_data.map((pd) => (
        <>
            <a key={pd.id} class="portfLink" href={pd.link}>[{pd.role}] {pd.projName} - ({pd.lang} | {pd.api})</a>
            <hr class="portfHr"></hr>
        </>
    ));
    return ( 
        <>
            <div class="projDiv">
                <h1>Projects</h1>
                <p>{p_list}</p>
            </div>
            <div class="certDiv">
                <h1>Certficates</h1>
                <p style={{ textAlign: "center"}}>Coming Soon</p>
            </div>
        </>
    )
}