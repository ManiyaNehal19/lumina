import AInput from "./components/AInput";
import { auth, currentUser } from '@clerk/nextjs/server'

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
    <div className="bg-[#110E25] w-full">
      <AInput userId= {userData}/>
    </div>
  );
}
