import { useState } from "react"
import '../style/Common.css'
import '../style/ChargeWindow.css'
import type { OptimalChargeWindow } from "../model/OptimalChargeWindow"
import Spinner from './Spinner'

function ChargeWindow() {
    const [optWindow, setOptWindow] = useState<OptimalChargeWindow>();
    const [selectedLength, setSelectedLength] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick: Function = () => {
        setLoading(true);
        fetch("/api/v1/energy/window?windowLength=" + selectedLength)
            .then((response: Response) => response.json())
            .then((data: any) => {
                return {
                    from: new Date(data.from),
                    to: new Date(data.to),
                    cleanPerc: data.cleanPerc
                }
            })
            .then((result: OptimalChargeWindow) => setOptWindow(result))
            .finally(() => setLoading(false));
    }

    return (
        <div className="container">
            <h2>Calculate the optimal window to charge your car</h2>
            <p>My charging window is {selectedLength} hour{selectedLength > 1 ? 's' : ''} long</p>
            <input type="range" min={1} max={6} value={selectedLength} onChange={(e) => setSelectedLength(e.target.valueAsNumber)}></input>
            <br></br>
            <button className="calculateButton" onClick={() => handleClick()} disabled={loading}>
                {loading ? "Calculating..." : "Calculate optimal window"}
            </button>
            {loading && <Spinner text="Calculating optimal window..."/>}
            {!loading && optWindow != undefined &&
                <div>
                    <h3>Your optimal charging window:</h3>
                    <p>Starts at: {optWindow.from.toLocaleString()}</p>
                    <p>Ends at: {optWindow.to.toLocaleString()}</p>
                    <p>Will consist of {Math.round(optWindow.cleanPerc)}% clean energy</p>
                </div>
            }
        </div>
    )
}

export default ChargeWindow;