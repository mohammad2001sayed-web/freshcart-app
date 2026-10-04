"use client";

import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  User,
  Lock,
  Save,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { ChangePasswordDataType, UpdateProfileDataType } from "../setting.interface";
import { handleChangePassword, handleUpdateProfile } from "../setting.action";

export default function SettingsClient() {
  // 🔹 status: "loading" | "authenticated" | "unauthenticated"
  // update() بتسمحلنا نحدّث الـ session من الـ client بعد نجاح العملية، من غير إعادة لوجن
  const { data: session, status, update } = useSession();

  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isProfilePending, startProfileTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  // 🔹 Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileDataType>({
    defaultValues: { name: "", email: "", phone: "" },
  });

  // 🔹 بيانات الـ session بتوصل async، فلما توصل بنملأ الفورم بيها
  useEffect(() => {
    if (session?.user) {
      resetProfileForm({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      });
    }
  }, [session, resetProfileForm]);

  // 🔹 Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordDataType>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  function onProfileSubmit(data: UpdateProfileDataType) {
    setProfileMessage(null);
    startProfileTransition(async () => {
      const res = await handleUpdateProfile(data);
      if (res?.message === "success" || res?.user) {
        // 🔹 بنحدّث الـ session فورًا بالقيم الجديدة (بيروح لـ jwt callback بـ trigger: "update")
        await update({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
        setProfileMessage({ type: "success", text: "تم حفظ التعديلات بنجاح" });
      } else {
        setProfileMessage({
          type: "error",
          text: res?.message || "حصل خطأ، حاول تاني",
        });
      }
    });
  }

  function onPasswordSubmit(data: ChangePasswordDataType) {
    setPasswordMessage(null);
    startPasswordTransition(async () => {
      const res = await handleChangePassword(data);
      if (res?.message === "success" || res?.token) {
        setPasswordMessage({
          type: "success",
          text: "تم تغيير كلمة المرور بنجاح",
        });
        resetPasswordForm();
      } else {
        setPasswordMessage({
          type: "error",
          text: res?.message || "حصل خطأ، حاول تاني",
        });
      }
    });
  }

  // 🔹 لسه بنجيب بيانات الـ session
  if (status === "loading") {
    return (
      <div className="bg-white rounded-2xl p-12 flex items-center justify-center shadow-sm border border-gray-100 max-w-3xl">
        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* 🔹 Profile Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Profile Information
            </h3>
            <p className="text-xs text-gray-500">Update your personal details</p>
          </div>
        </div>

        <form
          onSubmit={handleProfileSubmit(onProfileSubmit)}
          className="space-y-3"
          noValidate
        >
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                profileErrors.name ? "border-red-400" : "border-gray-200"
              }`}
              {...registerProfile("name", { required: "اكتب الاسم بالكامل" })}
            />
            {profileErrors.name && (
              <p className="text-[11px] text-red-500 mt-1">
                {profileErrors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                profileErrors.email ? "border-red-400" : "border-gray-200"
              }`}
              {...registerProfile("email", {
                required: "اكتب الإيميل",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "الإيميل غير صحيح",
                },
              })}
            />
            {profileErrors.email && (
              <p className="text-[11px] text-red-500 mt-1">
                {profileErrors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="01xxxxxxxxx"
              className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                profileErrors.phone ? "border-red-400" : "border-gray-200"
              }`}
              {...registerProfile("phone", {
                required: "اكتب رقم التليفون",
                pattern: {
                  value: /^01[0125][0-9]{8}$/,
                  message: "رقم التليفون غير صحيح (01xxxxxxxxx)",
                },
              })}
            />
            {profileErrors.phone && (
              <p className="text-[11px] text-red-500 mt-1">
                {profileErrors.phone.message}
              </p>
            )}
          </div>

          {profileMessage && (
            <p
              className={`text-xs font-medium ${
                profileMessage.type === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {profileMessage.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isProfilePending}
            className="bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isProfilePending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </form>

        {/* Account Information */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-900 mb-3">
            Account Information
          </h4>
          <div className="flex items-center justify-between text-xs py-1.5">
            <span className="text-gray-500">User ID</span>
            <span className="font-mono text-sky-600">
              {session?.user?._id || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-1.5">
            <span className="text-gray-500">Role</span>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold capitalize">
              {session?.user?.role || "user"}
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 Change Password Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Change Password
            </h3>
            <p className="text-xs text-gray-500">
              Update your account password
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-3"
          noValidate
        >
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                className={`w-full px-3 py-2.5 pr-10 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  passwordErrors.currentPassword
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
                {...registerPassword("currentPassword", {
                  required: "اكتب كلمة المرور الحالية",
                })}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-[11px] text-red-500 mt-1">
                {passwordErrors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className={`w-full px-3 py-2.5 pr-10 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  passwordErrors.password ? "border-red-400" : "border-gray-200"
                }`}
                {...registerPassword("password", {
                  required: "اكتب كلمة المرور الجديدة",
                  minLength: {
                    value: 6,
                    message: "لازم تكون 6 أحرف على الأقل",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {passwordErrors.password ? (
              <p className="text-[11px] text-red-500 mt-1">
                {passwordErrors.password.message}
              </p>
            ) : (
              <p className="text-[11px] text-gray-400 mt-1">
                Must be at least 6 characters
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className={`w-full px-3 py-2.5 pr-10 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  passwordErrors.rePassword
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
                {...registerPassword("rePassword", {
                  required: "أكّد كلمة المرور الجديدة",
                  validate: (value) =>
                    value === watch("password") || "كلمتا المرور غير متطابقتين",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {passwordErrors.rePassword && (
              <p className="text-[11px] text-red-500 mt-1">
                {passwordErrors.rePassword.message}
              </p>
            )}
          </div>

          {passwordMessage && (
            <p
              className={`text-xs font-medium ${
                passwordMessage.type === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {passwordMessage.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isPasswordPending}
            className="bg-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isPasswordPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}