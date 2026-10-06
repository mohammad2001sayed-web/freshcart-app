"use client";

import AppButton from "@/components/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@base-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./login.zod";
import { LoginDataType } from "./login.interface";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/loginfoto.png";
import { 
  Mail, 
  Lock, 
  Eye, 
  Truck, 
  ShieldCheck, 
  Clock, 
  LockKeyhole, 
  Users, 
  Star 
} from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  async function onSubmit(data: LoginDataType) {
    const loginPromise = signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        throw new Error(res.error);
      }
      if (!res?.ok) {
        throw new Error("Invalid credentials");
      }
      router.push("/");
      router.refresh();
      return "Logged in successfully";
    });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (msg) => msg,
      error: (err) => err.message || "An error occurred",
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* ================= LEFT COLUMN: HERO & BRANDING ================= */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden mb-6">
            {/* ضع مسار صورة السلة الخضراء الخاصة بك هنا */}
            <Image
              src={logoImage} 
              alt="FreshCart Products"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h1>

          <p className="text-slate-500 text-sm max-w-md mb-8">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Truck size={16} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck size={16} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Clock size={16} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: LOGIN CARD ================= */}
        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 w-full max-w-md mx-auto">
          
          {/* Logo & Welcome */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-emerald-600">Fresh<span className="text-slate-800">Cart</span></span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Welcome Back!</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-slate-700 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
             onClick={() => signIn("facebook", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 transition-all"
            >
              <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Separator */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[10px] uppercase tracking-wider font-semibold text-slate-400 absolute">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1">
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                    Email Address
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3.5 text-slate-400" />
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="gemyg@mailinator.com"
                      autoComplete="off"
                      type="email"
                      className={`w-full pl-10 pr-4 py-2.5 bg-blue-50/50 border rounded-xl text-xs font-medium transition-all outline-none ${
                        fieldState.invalid
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-transparent focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                      }`}
                    />
                  </div>
                  {fieldState.invalid && (
                    <span className="text-[11px] text-red-500 mt-0.5">
                      <FieldError errors={[fieldState.error]} />
                    </span>
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                      Password
                    </FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-slate-400" />
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••••••"
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-10 pr-10 py-2.5 bg-blue-50/50 border rounded-xl text-xs font-medium transition-all outline-none ${
                        fieldState.invalid
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-transparent focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <span className="text-[11px] text-red-500 mt-0.5">
                      <FieldError errors={[fieldState.error]} />
                    </span>
                  )}
                </Field>
              )}
            />

            {/* Remember me */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Submit Button */}
            <AppButton
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-100 transition-all text-xs mt-2 cursor-pointer"
            >
              Sign In
            </AppButton>
          </form>

          {/* Footer inside Card */}
          <div className="text-center mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-600">
              New to FreshCart?{" "}
              <Link href="/register" className="text-emerald-600 font-bold hover:underline">
                Create an account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 mt-4">
              <div className="flex items-center gap-1">
                <LockKeyhole size={12} />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}