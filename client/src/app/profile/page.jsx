import ProfileSetting from "@/components/ProfileSetting";
import StoreProvider from "../StoreProvider";

export const metadata = {
  title: "your Profile | GTB4LOVE",
  description: "Welcome to GTB4Love – Where GTB4CEC & GTBIT Hearts Connect!, our journey is more than just academics – it’s about building lasting connections. CentaHearts is your exclusive matchmaking platform designed specifically for the vibrant students of GTB4CEC. Whether you're looking for a soulmate, a study partner, or simply a new friend, your next great connection could be just a click away",
};

const page = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-center w-full cookie">
      <StoreProvider>
        <ProfileSetting />
      </StoreProvider>
      </div>
    </div>
  );
};

export default page;
