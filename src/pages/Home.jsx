import React from 'react'
import HeroSection from '../components/home/sections/HeroSection'
import QuickPick from '../components/home/sections/QuickPick'
import FeaturesSection from '../components/home/sections/FeaturesSection'
import DownloadApp from '../components/home/sections/DownloadApp'

const Home = () => {
  return (
    <div>
        <HeroSection/>

        <QuickPick/>

        <FeaturesSection/>

        <DownloadApp/>
    </div>
  )
}

export default Home