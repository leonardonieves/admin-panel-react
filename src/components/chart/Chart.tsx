import React from 'react'
import './chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Chart = () => {
    const data = [
        {
          name: 'January',
          uv: 4000,
          "Active Users": 2400,
          amt: 2400,
        },
        {
          name: 'February',
          uv: 3000,
          "Active Users": 1398,
          amt: 2210,
        },
        {
          name: 'March',
          uv: 2000,
          "Active Users": 9800,
          amt: 2290,
        },
        {
          name: 'April',
          uv: 2780,
          "Active Users": 3908,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 1890,
          "Active Users": 4800,
          amt: 2181,
        },
        {
          name: 'June',
          uv: 2390,
          "Active Users": 3800,
          amt: 2500,
        },
        {
          name: 'July',
          uv: 3490,
          "Active Users": 4300,
          amt: 2100,
        },
      ];
  return (
    <div className='chart'>
        <h3 className="chartTitle">Sales Analytics</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke='#5550bd'/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Active Users" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
