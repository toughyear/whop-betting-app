import { db } from "@/lib/firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export enum EventStatus {
  InProgress = "in_progress",
  Success = "success",
  Failure = "failure",
}

export interface Event {
  id?: string;
  description: string;
  status: EventStatus;
  amount_event_success?: number;
  amount_event_failure?: number;
}

export async function createEvent(eventData: Omit<Event, "id">) {
  const eventId = nanoid(10);
  const eventRef = doc(db, "events", eventId);

  await setDoc(eventRef, { ...eventData, id: eventId });
  console.log("Event created with id: ", eventId);
}

export async function createEventWithDescription(description: string) {
  const eventData: Omit<Event, "id"> = {
    description,
    status: EventStatus.InProgress,
    amount_event_success: 0,
    amount_event_failure: 0,
  };
  await createEvent(eventData);
}

// New function for event subscription
export const subscribeToEvents = (
  onEventsChanged: (events: Event[]) => void
) => {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const updatedEvents: Event[] = [];
    querySnapshot.forEach((doc) => {
      updatedEvents.push(doc.data() as Event);
    });
    onEventsChanged(updatedEvents);
  });

  return unsubscribe;
};

export async function getEvent(eventId: string): Promise<Event | null> {
  const eventRef = doc(db, "events", eventId);
  const docSnap = await getDoc(eventRef);

  if (docSnap.exists()) {
    return docSnap.data() as Event;
  }

  console.log("Event does not exist");
  return null;
}

export async function getEvents(): Promise<Event[]> {
  const eventsRef = collection(db, "events");
  const querySnapshot = await getDocs(eventsRef);
  const events: Event[] = [];

  querySnapshot.forEach((doc) => {
    events.push(doc.data() as Event);
  });

  return events;
}
