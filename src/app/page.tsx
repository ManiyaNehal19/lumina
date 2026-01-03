import AInput from "./components/AInput";
import { auth, currentUser } from '@clerk/nextjs/server'
import Deck from "./components/Deck";

export default async function Home() {
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) {
    return <div>Sign in to view this page</div>
  }
  const user = await currentUser();
  const userData = {
    id: user?.id ?? "",
    firstName: user?.firstName ?? "",
    imageUrl: user?.imageUrl ?? "",
    hasImage: !!user?.imageUrl,
  };
  return (
    <div className="w-full">
      <AInput userId= {userData}/>
      <Deck userId={userData}/>
    </div>
  );
}
