import { BadgeDollarSign, BadgeEuro } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";

function Admin() {
  return (
    <div className='bg-[#090A0C] p-4 text-white min-h-screen'>
      {/* dashboard */}
      <div className='bg-[#322EFF] px-8 py-10 rounded-2xl m-5'>
        <h1 className='text-3xl font-extrabold tracking-tight mb-5'>
          Manage Events
        </h1>
        <div className='flex items-center'>
          <h1 className='text-7xl font-thin tracking-tight'>
            2 <span className='text-white/40 text-4xl'>Events Active</span>
          </h1>
          <div className='h-12 w-[2px] bg-white/70 mx-20'></div>
          <h1 className='text-7xl font-thin tracking-tight'>
            3 <span className='text-white/40 text-4xl'>Events Finished</span>
          </h1>
        </div>
      </div>

      <div className='m-5 flex flex-row'>
        {/* create event */}
        <div className='bg-[#DBFF4A] px-8 py-10 rounded-2xl w-2/3 mr-5 text-black flex flex-col'>
          <h3 className='text-2xl font-semibold tracking-tight'>
            Create Event
          </h3>
          <div className='mt-5 flex items-center'>
            <h4 className='text-6xl font-semibold mr-2'>will</h4>
            <input
              type='text'
              className='p-2 w-full outline-none text-lg font-semibold tracking-tight bg-transparent border-b-2 border-black placeholder:text-black/30'
              placeholder='this thing happen?'
            />
          </div>
          <h3 className='text-lg font-semibold text-gray-800 tracking-tight mt-10 font-open-sans'>
            Place the first bet
          </h3>

          <RadioGroup
            defaultValue='will-happen'
            className='mt-5 [&_label]:text-lg [&_label:hover]:underline [&_label:hover]:cursor-pointer'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='will-happen' id='will-happen' />
              <Label htmlFor='will-happen'>Bet Yes</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='will-not-happen' id='will-not-happen' />
              <Label htmlFor='will-not-happen'>Bet No</Label>
            </div>
          </RadioGroup>
          <div className='flex mt-4 items-center'>
            <div className='h-10 w-10 bg-black border-2 border-[#DBFF4A]  rounded-full shadow-sm z-[2] flex items-center justify-center'>
              <BadgeEuro className='text-white h-6 w-6' />
            </div>
            <div className='h-10 w-10  bg-gray-800/20 border-[#DBFF4A] border-2 rounded-full -ml-4 shadow-sm z-[1] flex items-center justify-center'>
              <BadgeDollarSign className='text-gray-800/40 h-6 w-6' />
            </div>

            <input
              type='number'
              className='outline-none text-right text-xl font-semibold tracking-tight bg-transparent placeholder:text-black/30'
              placeholder='20,000'
            />
            <h4 className='text-xl font-semibold ml-2'>Coins.</h4>
            <button className='text-white bg-black rounded-xl py-3 px-6 self-start ml-auto'>
              PLACE BET
            </button>
          </div>
        </div>
        {/* extra info on sidebar */}
        <div className='bg-white px-8 py-10 rounded-2xl w-1/3 text-gray-700'>
          <h1 className='text-zinc-500'>Click on an event to see more info</h1>
        </div>
      </div>
    </div>
  );
}

export default Admin;
