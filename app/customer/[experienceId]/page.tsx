import { addUser } from "@/lib/firebase/user";
import { PageProps } from "@/lib/types";
import BettingHome from "@/pages/BettingHome";
import { WhopAPI, hasAccess, validateToken } from "@whop-apps/sdk";
import { headers } from "next/headers";

// Replace this with an actual database
const myDatabase = {
  getContent: async (experienceId: string) => {
    return "Hello World";
  },
};

export default async function Page({
  params: { experienceId },
}: PageProps<"experienceId">) {
  // Ensure user has purchased your product
  if (!(await hasAccess({ to: experienceId, headers }))) {
    return (
      <div>
        You are not authorized to view this page. You must purchase a product
        first. (Make sure you are developing in the whop.com iframe if testing)
      </div>
    );
  }

  // Get the current user id:
  const { userId } = await validateToken({ headers });

  // Fetch info about the user
  const user = await WhopAPI.app().GET("/app/users/{id}", {
    params: { path: { id: userId } },
  });

  if (user.isErr) {
    return <div>{user.error.message}</div>;
  }

  // check and update user if not already existing
  addUser(user.data);
  // Fetch content for the experience from your database
  const content = await myDatabase.getContent(experienceId);

  return <BettingHome userEmail={user.data.email} />;
}
