import React, { useState, useEffect } from 'react';
import random from 'random';

import styles from './Chart.module.sass';

interface IChart {
    data: Array<number>
}

export const Chart: React.FC<IChart> = ({ data }) => {

    const [ percents, setPercents ] = useState<number[]>([]);

    const heights = [ 25, 15, 24, 16, 23, 17, 22, 18 ];

    useEffect(() => {
        console.log(percents);
    }, [percents]);

    useEffect(() => {
        const mins = Math.min.apply(Math, data);
        const largest = Math.max.apply(Math, data);
    
        const dataset = data.map(item => {
            const result = Math.round(((item - mins) / (largest - mins)) * 100 / 3);
            // console.log(`${item} - ${result}`)
            return result;
        });

        // console.log(`${dataset}`)

        setPercents(dataset);

        // return () => {
        //     alert('umount');
        // }
    }, []);

    return (
        <ul className={styles.chartWrapper}> 
            {percents.map((percent: number, key: number) => (
                 <li key={key}>                     
                    <span
                        className={styles.candle}
                        style={{
                            position: 'absolute',
                            bottom: percent,
                            height: heights[key]
                        }}
                    />
                </li>
            ))}
            {/* {data.map((number) => (           
                {number}
            ))}  */}
        </ul>
    )
}