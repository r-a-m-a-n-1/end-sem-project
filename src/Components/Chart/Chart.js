import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    // PointElement,
    // LineElement,
    Title,
    Tooltip,
    Legend,
    // ArcElement,
    BarElement
} from 'chart.js'

import {Bar} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    // PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    // ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                // tension: .2
                borderWidth: 1
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                // tension: .2
                borderWidth: 1
            }
        ]
    }


    return (
        <ChartStyled >
            <Bar data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #D8D9DA;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
