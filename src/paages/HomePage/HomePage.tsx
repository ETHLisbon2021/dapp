import React from 'react'

import FundedProjects from 'compositions/FundedProjects/FundedProjects'

import Hero from './components/Hero/Hero'
import UpcomingProjects from './components/UpcomingProjects/UpcomingProjects'


const HomePage = () => {

  return (
    <div>
      <Hero />
      <UpcomingProjects />
      <FundedProjects title="Funded projects" />
    </div>
  )
}


export default HomePage
