import React from 'react'
import HeroSection from '../components/home/sections/HeroSection'
import QuickPick from '../components/home/sections/QuickPick'
import FeaturesSection from '../components/home/sections/FeaturesSection'

const Home = () => {
  return (
    <div>
        <HeroSection/>

        <QuickPick/>

        <FeaturesSection/>

        <section style={{ height: "200vh", backgroundColor: "#000000" }}></section>
    </div>
  )
}

export default Home