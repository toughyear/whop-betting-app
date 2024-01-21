import { Label } from "@/components/ui/label";
import ProgressIndicator from "@/components/ui/progress-circle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeDollarSign, BadgeEuro } from "lucide-react";
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
        <div className='bg-white px-8 py-10 rounded-2xl'>
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

          {/* grid bet card results */}
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5 text-black'>
            <article className='relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8'>
              <p className='mt-6 flex gap-x-2 text-sm text-neutral-950'>
                <time className='font-semibold text-[#322EFF] hover:underline underline-offset-4 cursor-pointer'>
                  @matt03
                </time>
                <span className='text-neutral-300' aria-hidden='true'>
                  /
                </span>
                <span>2 hrs ago</span>
              </p>
              <p className='mt-6 font-display text-2xl font-semibold text-neutral-800'>
                Will trump win the 2024 Election?
              </p>
              <div className='flex mt-4 text-sm font-mono'>
                <p className='px-2 py-1 bg-black/80 text-white mr-2'>
                  politics
                </p>
                <p className='px-2 py-1 bg-black/80 text-white mr-2'>
                  election
                </p>
                <p className='px-2 py-1 bg-black/80 text-white mr-2'>US</p>
              </div>
              <ProgressIndicator completion={70} />
              <p className='mx-auto text-sm font-bold text-neutral-600'>
                chance of happening
              </p>

              {/* place bet */}

              <h3 className='text-lg font-semibold text-gray-800 tracking-tight mt-10 font-open-sans'>
                Place your bet
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
                  <RadioGroupItem
                    value='will-not-happen'
                    id='will-not-happen'
                  />
                  <Label htmlFor='will-not-happen'>Bet No</Label>
                </div>
              </RadioGroup>
              <div className='flex mt-4 items-center'>
                <div className='flex'>
                  <div className='h-10 w-10 bg-black border-2 border-neutral-900/20  rounded-full shadow-sm z-[2] flex items-center justify-center'>
                    <BadgeEuro className='text-white h-6 w-6' />
                  </div>
                  <div className='h-10 w-10  bg-gray-800/20 border-neutral-900/20 border-2 rounded-full -ml-4 shadow-sm z-[1] flex items-center justify-center'>
                    <BadgeDollarSign className='text-gray-800/40 h-6 w-6' />
                  </div>
                </div>
                <input
                  type='number'
                  className='outline-none text-right min-w-0 text-lg font-semibold tracking-tight bg-transparent placeholder:text-black/30'
                  placeholder='20,000'
                />
                <h4 className='text-md font-semibold ml-1'>Coins.</h4>
              </div>

              <button className='text-white bg-black rounded-lg text-sm py-2 px-4 self-start ml-auto'>
                PLACE BET
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BettingHome;
