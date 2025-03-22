import { Metadata } from "next";
import { ProfileData } from "./ProfileData";
import { generateRandomReadableColor } from "@/utils";

export const metadata: Metadata = {
  title: 'Profile page'
}

export default function ProfilePage() {
    const bgColor = generateRandomReadableColor()
  return (

      <div className="w-full flex justify-center pt-10 relative">
        {/* Image Profile */}

        <ProfileData bgColor={bgColor}/>
        
      </div>

  );
}
