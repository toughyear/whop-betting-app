"use client";
import useUserStore from "@/app/store/user";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "@/components/ui/progress-circle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Event, getEvents, subscribeToEvents } from "@/lib/firebase/event";
import { Bet, createBet } from "@/lib/firebase/bet";
import { BadgeDollarSign, BadgeEuro } from "lucide-react";
import numbro from "numbro";
import React, { useEffect, useState } from "react";

export function seededRandom(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs((hash % 1000) / 1000); // Normalize the result to [0, 1)
}

function BettingHome(props: { userEmail: string | undefined }) {
  const updateUserFromDB = useUserStore((state) => state.updateUserFromDB);
  const user = useUserStore((state) => state.user);
  const [events, setEvents] = useState<Event[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    if (!props.userEmail) return;

    const unsubscribe = updateUserFromDB(props.userEmail);
    // Cleanup subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, [props.userEmail, updateUserFromDB]);

  useEffect(() => {
    // Subscribe to events
    const unsubscribe = subscribeToEvents((newEvents) => {
      setEvents(newEvents);

      const bets: Bet[] = newEvents.map((event) => ({
        event_id: event.id ?? "event_id_not_found",
        will_happen: true,
        user_id: user?.id ?? "user_id_not_found",
        user_email: user?.email ?? "user_email_not_found",
        amount: 0,
      }));

      setBets(bets);
    });

    // Cleanup
    return () => unsubscribe();
  }, [user]);

  const handlePlaceBet = async (eventId: string | undefined) => {
    const selectedBet = bets.find((bet) => bet.event_id === eventId);
    if (
      selectedBet?.amount === undefined ||
      selectedBet?.will_happen === undefined
    ) {
      toast({ title: "Error", description: "Bet not found" });
      return;
    }

    if (!eventId) {
      toast({ title: "Error", description: "Event not found" });
      return;
    }
    if (!user || !user.coins) {
      toast({ title: "Error", description: "User not found" });
      return;
    }

    if (selectedBet?.amount <= 0 || selectedBet?.amount > user.coins) {
      toast({ title: "Invalid Bet", description: "Bet amount is not valid" });
      return;
    }

    try {
      await createBet({
        event_id: eventId,
        will_happen: selectedBet?.will_happen,
        user_id: user.id ?? "user_id_not_found",
        user_email: user.email ?? "user_email_not_found",
        amount: selectedBet?.amount,
      });

      toast({
        title: "Bet Placed",
        description: "Your bet has been successfully placed",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to place bet" });
    }
  };

  if (!user) return "Loading...";
  return (
    <div className='bg-[#090A0C] p-4 text-white min-h-screen'>
      <div className='max-w-5xl mx-auto flex flex-col'>
        <div className='bg-[#322EFF] px-8 py-10 rounded-2xl mb-5'>
          <h1 className='text-3xl font-extrabold tracking-tight mb-5'>
            Welcome Back, {user?.name}!
          </h1>
          <div className='flex items-center font-mono'>
            <h1 className='text-7xl font-thin tracking-tight'>
              02{" "}
              <span className='text-white/40 text-4xl'> bets are active</span>
            </h1>
            <div className='h-12 w-[2px] bg-white/70 mx-20'></div>
            <h1 className='text-7xl font-thin tracking-tight'>
              {numbro(user.coins).format({ thousandSeparated: true })}{" "}
              <span className='text-white/40 text-4xl'>coins</span>
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
            {events.map((event) => {
              return (
                <article
                  key={event.id}
                  className='relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8'
                >
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
                    {event.description}
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
                  <div className='my-5 flex items-center'>
                    <ProgressIndicator
                      completion={seededRandom(event.id ?? "default") * 100}
                    />
                    <p className='mx-auto text-sm font-bold text-neutral-600'>
                      chance of happening
                    </p>
                  </div>

                  {/* place bet */}

                  <h3 className='text-lg mt-auto font-semibold text-gray-800 tracking-tight font-open-sans'>
                    Place your bet
                  </h3>

                  <RadioGroup
                    defaultValue='will-happen'
                    onValueChange={(value) => {
                      const newBets = bets.map((bet) => {
                        if (bet.event_id === event.id) {
                          return {
                            ...bet,
                            will_happen: value === "will-happen",
                          };
                        }
                        return bet;
                      });
                      setBets(newBets);
                    }}
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
                      value={
                        bets.find((bet) => bet.event_id === event.id)?.amount
                      }
                      onChange={(e) => {
                        const newBets = bets.map((bet) => {
                          if (bet.event_id === event.id) {
                            return {
                              ...bet,
                              amount: parseInt(e.target.value),
                            };
                          }
                          return bet;
                        });
                        setBets(newBets);
                      }}
                      className='outline-none text-right min-w-0 text-lg font-semibold tracking-tight bg-transparent placeholder:text-black/30'
                      placeholder='20,000'
                    />
                    <h4 className='text-md font-semibold ml-1'>Coins.</h4>
                  </div>

                  <button
                    className='text-white bg-black rounded-lg text-sm py-2 px-4 self-start ml-auto'
                    onClick={() => handlePlaceBet(event.id)}
                  >
                    PLACE BET
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BettingHome;
