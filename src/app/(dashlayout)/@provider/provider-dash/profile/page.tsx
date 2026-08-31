import { providerServices } from "@/modules/services/provider.services";
import { userServices } from "@/modules/services/user.service";
import KitchenRoomProfile from "@/myComponents/dashboard/provider-dash/ProviderProfile";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sessionUser = await userServices.getSessionUser();

  if (!sessionUser) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Please sign in</h2>
        <p className="text-gray-500">
          You need to be logged in to view your profile.
        </p>
      </div>
    );
  }

  const { email } = sessionUser;

  const provider = await providerServices.getProvidersByemail(email);

  return (
    <div>
      <KitchenRoomProfile data={provider} />
    </div>
  );
}