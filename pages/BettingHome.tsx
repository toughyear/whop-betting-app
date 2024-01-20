import React from "react";

function BettingHome() {
  return (
    <div className='bg-[#090A0C] p-4 text-white min-h-screen'>
      <div className='max-w-5xl mx-auto flex flex-col'>
        <div className='bg-[#322EFF] px-8 py-10 rounded-2xl mb-5'>
          <h1 className='text-3xl font-extrabold tracking-tight mb-5'>
            Welcome Back, Jane!
          </h1>
          <div className='flex items-center font-mono'>
            <h1 className='text-7xl font-thin tracking-tight'>
              02{" "}
              <span className='text-white/40 text-4xl'> bets are active</span>
            </h1>
            <div className='h-12 w-[2px] bg-white/70 mx-20'></div>
            <h1 className='text-7xl font-thin tracking-tight'>
              3,100 <span className='text-white/40 text-4xl'>coins</span>
            </h1>
          </div>
        </div>
        <div className='bg-[#DBFF4A] px-8 py-10 rounded-2xl'>
          <div className='flex items-center'>
            <button className='text-white bg-black rounded-full py-3 px-6'>
              New Bets
            </button>
            <button className='text-black bg-transparent border border-black rounded-full py-3 px-6 ml-5'>
              Running Bets
            </button>
            <button className='text-black bg-transparent border border-black rounded-full py-3 px-6 ml-5'>
              Finished Bets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BettingHome;
