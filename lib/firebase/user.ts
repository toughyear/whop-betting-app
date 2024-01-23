import useUserStore from "@/app/store/user";
import { db } from "@/lib/firebase/config";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export interface User {
  email?: string;
  id?: string;
  name?: string;
  profile_pic_url?: string;
  username?: string;
  coins?: number;
}

export async function addUser(user: User) {
  const userRef = doc(db, "users", user.email ?? user.id ?? "email_not_found");
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    console.log("user does not exist, adding user");
    await setDoc(userRef, { ...user, coins: 2000 });
    console.log("user added with id: ", user.email);
    return;
  }

  console.log("user already exists");
}

export async function getUser(email: string): Promise<User | null> {
  const userRef = doc(db, "users", email);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  console.log("user does not exist");
  return null;
}

// Function to subscribe to user document changes
export function subscribeToUser(
  email: string,
  callback: (user: User | null) => void
) {
  const userRef = doc(db, "users", email);

  const unsubscribe = onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as User);
    } else {
      console.log("User does not exist");
      callback(null);
    }
  });

  return unsubscribe; // Return the unsubscribe function
}

export async function deductCoins(email: string, amount: number) {
  const userRef = doc(db, "users", email);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as User;
    // net zero if user has no coins
    await setDoc(userRef, { ...user, coins: (user.coins ?? amount) - amount });
    console.log("coins deducted");
    return;
  }

  console.log("user does not exist");
}

export async function addCoins(email: string, amount: number) {
  const userRef = doc(db, "users", email);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as User;
    await setDoc(userRef, { ...user, coins: (user.coins ?? 0) + amount });
    console.log("coins added");
    return;
  }

  console.log("user does not exist");
}
