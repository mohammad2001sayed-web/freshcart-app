import { createHmac } from "crypto";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type BackendUser = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  tkn: string;
};

// 🔹 الـ API بتاع Route Academy مفيهوش دخول بـ Google/Facebook، فبنعمل لكل يوزر
// OAuth حساب عادي عندهم بباسورد "مشتق" من الإيميل + AUTH_SECRET (ثابت ومش بيتخزن).
// الباسورد بيحقق شروط القوة: حرف كبير + صغير + رقم + رمز خاص.
function derivePassword(email: string) {
  const hash = createHmac("sha256", process.env.AUTH_SECRET as string)
    .update(email.toLowerCase())
    .digest("hex");
  return `Aa1@${hash.slice(0, 24)}`;
}

async function backendSignIn(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await res.json();
  if (data?.message === "success" && data?.token) {
    return { ...data.user, tkn: data.token } as BackendUser;
  }
  return null;
}

export async function exchangeOAuthUserForBackendToken({
  email,
  name,
}: {
  email: string;
  name?: string | null;
}): Promise<BackendUser | null> {
  const password = derivePassword(email);

  // 1) لو اليوزر اتسجّل قبل كده بالطريقة دي -> دخول مباشر
  const existing = await backendSignIn(email, password);
  if (existing) return existing;

  // 2) أول مرة -> نعمل له حساب
  // ⚠️ الـ API بيطلب رقم تليفون مصري صالح في الـ signup، وجوجل/فيسبوك مش بيدّوه،
  // فبنحط رقم افتراضي والمستخدم يقدر يعدّله من صفحة Settings.
  const safeName =
    name && name.trim().length >= 3 ? name.trim() : email.split("@")[0].padEnd(3, "_");

  const signupRes = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: safeName,
      email,
      password,
      rePassword: password,
      phone: "01000000000",
    }),
    cache: "no-store",
  });
  const signupData = await signupRes.json();

  if (signupData?.message !== "success") {
    // غالبًا الإيميل ده مسجّل بالفعل بباسورد عادي من اليوزر نفسه -> مش هنربطهم تلقائيًا (أمان)
    console.error("OAuth backend signup failed:", signupData?.message);
    return null;
  }

  // 3) دخول بعد التسجيل عشان نضمن توكن صالح
  return backendSignIn(email, password);
}