import React from 'react'

import Hero from './components/Hero/Hero'
import UpcomingProjects from './components/UpcomingProjects/UpcomingProjects'
import FundedProjects from './components/FundedProjects/FundedProjects'


const HomePage = () => {


  return (
    <div>
      <Hero />
      <UpcomingProjects />
      <FundedProjects />
    </div>
  )
}


export default HomePage
