import { useState, useEffect } from "react";
import Spinner from './Spinner'
import type { DailyMix } from "../model/DailyMix";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import '../style/DailyMix.css'
import '../style/Common.css'

ChartJS.register(ArcElement, Tooltip, Legend, Colors);
const API_URL = '/api/v1/energy/current';

function CurrentMix() {
    const [mixes, setMixes] = useState<DailyMix[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
            .then((response: Response) => response.json())
            .then((interim: any) => {
                const parsedMixes: DailyMix[] = interim.mixes.map((m: any) => ({
                    date: new Date(m.date),
                    sourceMix: new Map(Object.entries(m.sourceMix))
                }));
                setMixes(parsedMixes);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container">
            <h2>Energy mix in Great Britain</h2>
            {loading && <Spinner text="Fetching energy mix..."/>}
            {!loading && (
                <div className="chartsRow">
                    {mixes && mixes.length > 0 && (
                    mixes.map((m, i) => (
                        <div key={i}>
                            <Doughnut data={{
                                labels: Array.from(m.sourceMix.keys()),
                                datasets: [
                                    {
                                        label: "Percent",
                                        data: Array.from(m.sourceMix.values()),
                                        borderWidth: 3
                                    }
                                ],
                            }}/>
                            <h3>{m.date.toDateString()}</h3>
                            <h5 style={{color: "gray"}}>{m.date > new Date() ? "Predicted" : "Actual"}</h5>
                        </div>
                    ))
                    )}
                </div>
            )}
        </div>
    )
}

export default CurrentMix;