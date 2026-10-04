import SettingsClient from "./SettingsClient/SettingsClient";

export default function page() {
  return (
    <div>
      <h1 className="text-xl font-extrabold text-gray-900">
        Account Settings
      </h1>
      <p className="text-xs md:text-sm text-gray-500 mt-0.5 mb-6">
        Update your profile information and change your password
      </p>

      <SettingsClient />
    </div>
  );
}