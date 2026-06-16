import { useState, useEffect } from "react";
import type { DailyMix } from "../model/DailyMix";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import '../style/DailyMix.css'

ChartJS.register(ArcElement, Tooltip, Legend, Colors);
const API_URL = '/api/v1/energy/current';

function CurrentMix(){
  const [mixes, setMixes] = useState<DailyMix[]>();

  useEffect(() => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const parsedMixes = data.mixes.map((mix: any) => ({
            ...mix,
            sourceMix: new Map(Object.entries(mix.sourceMix))
        }));
        setMixes(parsedMixes);
    })
  }, []);

  return (
    <div className="charts">
        {mixes && mixes.length > 0 && (
            mixes.map((m, i) => (
                <Doughnut key={i} data={{
                    labels: Array.from(m.sourceMix.keys()), 
                    datasets: [
                        {
                            label: "Percent", 
                            data: Array.from(m.sourceMix.values()),
                            borderWidth: 3
                        }
                    ],
                }}/>
            ))
        )}
    </div>
  )
}

export default CurrentMix;