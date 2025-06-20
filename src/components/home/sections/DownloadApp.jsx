import React from 'react'

const DownloadApp = () => {
  return (
    <div className="h-[350px] bg-mainYellow/50 rounded-xl mb-20 px-[3rem] flex items-center justify-between overflow-hidden">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-2xl">York<span className="text-mainRed">T</span>own</p>

        <div className="flex flex-col items-start gap-0">
          <p className="font-archivo text-2xl font-semibold">Download the YorkTown App now for your convenience!</p>
          <p className="font-poppins text-white/70">For best offers and discounts curated specially for you</p>
        </div>

        <div className="flex gap-2">
          <img src="/GooglePlay.svg" />
          <img src="/AppStore.svg" />
        </div>
      </div>

      <div className="w-fit h-fit relative translate-y-1/4">
        <img src="/iPhone 14 Pro.svg" />
      </div>
    </div>
  );
}

export default DownloadApp