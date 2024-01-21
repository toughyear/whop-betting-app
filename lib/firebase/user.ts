import { db } from "@/lib/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface User {
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
