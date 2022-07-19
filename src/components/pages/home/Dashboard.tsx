import React from 'react'
import { Chart } from '../../chart/Chart'
import FeaturedInfo from '../../featuredInfo/FeaturedInfo'
import './home.css'

const Dashboard = () => {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart />
    </div>
  )
}

export default Dashboard