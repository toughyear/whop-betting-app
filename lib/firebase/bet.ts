import { db } from "@/lib/firebase/config";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { nanoid } from "nanoid";
import { deductCoins } from "./user";

export interface Bet {
  id?: string;
  event_id: string;
  will_happen: boolean;
  user_id: string;
  user_email: string;
  amount: number;
}

export async function createBet(betData: Omit<Bet, "id">) {
  const betId = nanoid(10);
  const betRef = doc(db, "bets", betId);

  await setDoc(betRef, { ...betData, id: betId });
  await deductCoins(betData.user_email, betData.amount);

  console.log("Bet created with id: ", betId);
}

export async function getBet(betId: string): Promise<Bet | null> {
  const betRef = doc(db, "bets", betId);
  const docSnap = await getDoc(betRef);

  if (docSnap.exists()) {
    return docSnap.data() as Bet;
  }

  console.log("Bet does not exist");
  return null;
}

export async function getBets(): Promise<Bet[]> {
  const betsRef = collection(db, "bets");
  const querySnapshot = await getDocs(betsRef);
  const bets: Bet[] = [];

  querySnapshot.forEach((doc) => {
    bets.push(doc.data() as Bet);
  });

  return bets;
}
