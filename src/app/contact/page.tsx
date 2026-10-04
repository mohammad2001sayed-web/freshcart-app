"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { Phone, Mail, MapPin, Clock, Send, HelpCircle, Loader2 } from "lucide-react";

// 🔹 مكونات shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// نوع البيانات المدخلة
interface ContactFormInputs {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export default function Page() {
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 🔹 دالة إرسال البيانات للـ API
  const onSubmit = async (data: ContactFormInputs) => {
    setStatusMessage(null);
    try {
      // 1️⃣ استدعاء الـ API (استبدل /api/contact بمسار الـ Backend بتاعك)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // 2️⃣ في حالة النجاح
      setStatusMessage({ type: "success", text: "Your message has been sent successfully!" });
      reset(); // تصفير الفورم
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 🔹 Green Header Hero Section */}
      <div className="bg-[#00a651] text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-emerald-100 mb-4 font-medium">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            / Contact Us
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-emerald-100 font-medium">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </div>

      {/* 🔹 Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 👈 Left Column: Contact Cards & Socials */}
          <div className="lg:col-span-4 space-y-4">
            {/* Phone Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 text-[#00a651] p-3 rounded-xl shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Phone</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Mon-Fri from 8am to 6pm
                </p>
                <a
                  href="tel:+18001234567"
                  className="text-sm font-bold text-[#00a651] mt-1 inline-block hover:underline"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 text-[#00a651] p-3 rounded-xl shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Email</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  We'll respond within 24 hours
                </p>
                <a
                  href="mailto:support@freshcart.com"
                  className="text-sm font-bold text-[#00a651] mt-1 inline-block hover:underline"
                >
                  support@freshcart.com
                </a>
              </div>
            </div>

            {/* Office Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 text-[#00a651] p-3 rounded-xl shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Office</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 text-[#00a651] p-3 rounded-xl shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Business Hours
                </h3>
                <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                  <p>Monday - Friday: 8am - 6pm</p>
                  <p>Saturday: 9am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Follow Us Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-xs mb-3">
                Follow Us
              </h3>
              <div className="flex items-center gap-2.5">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#00a651] hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#00a651] hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#00a651] hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-[#00a651] hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" />
                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 👉 Right Column: Form & Help Center Banner */}
          <div className="lg:col-span-8 space-y-6">
            {/* Form Box */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-50 text-[#00a651] p-2.5 rounded-xl">
                  <Send size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">
                    Send us a Message
                  </h2>
                  <p className="text-xs text-gray-400">
                    Fill out the form and we'll get back to you
                  </p>
                </div>
              </div>

              {/* 🛑 رسالة التنبيه في حالة النجاح أو الخطأ */}
              {statusMessage && (
                <div
                  className={`p-3.5 mb-4 rounded-xl text-xs font-semibold ${
                    statusMessage.type === "success"
                      ? "bg-emerald-50 text-[#00a651] border border-emerald-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Form with handleSubmit */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="rounded-xl border-gray-200 focus-visible:ring-[#00a651]"
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-red-500 font-medium">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-700">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="rounded-xl border-gray-200 focus-visible:ring-[#00a651]"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 font-medium">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Select */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Subject
                  </label>
                  <Controller
                    name="subject"
                    control={control}
                    rules={{ required: "Please select a subject" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full rounded-xl border-gray-200 text-gray-500 focus:ring-[#00a651]">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="support">Order Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-500 font-medium">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Message
                  </label>
                  <Textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="rounded-xl border-gray-200 focus-visible:ring-[#00a651] resize-none"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 font-medium">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00a651] hover:bg-[#008e45] text-white font-bold px-6 py-5 rounded-xl flex items-center gap-2 text-sm shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Bottom Help Center Box */}
            <div className="bg-[#e6f7ef]/60 border border-[#00a651]/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-[#00a651] text-white p-2 rounded-lg shrink-0 mt-0.5">
                <HelpCircle size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Looking for quick answers?
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Check out our Help Center for frequently asked questions about
                  orders, shipping, returns, and more.
                </p>
                <Link
                  href="/help"
                  className="text-xs font-bold text-[#00a651] mt-2 inline-flex items-center gap-1 hover:underline"
                >
                  Visit Help Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}