<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

বাংলাদেশের বিভিন্ন বাজারের দৈনন্দিন পণ্যের দাম ট্র্যাক করার একটি আধুনিক বাংলা ওয়েব অ্যাপ।

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-v1-green)](https://better-auth.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)](https://bazardor-nu.vercel.app)

**[🌐 Live Demo](https://bazardor-nu.vercel.app)** · **[📦 GitHub Repo](https://github.com/aminulislamdev/BazarDor)** · **[🔌 API](https://api.api-store.workers.dev/api/bazardor)**

</div>

---

## 📑 সূচিপত্র

- [পরিচিতি](#-পরিচিতি)
- [মূল ফিচার](#-মূল-ফিচার)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [প্রজেক্ট স্ট্রাকচার](#-প্রজেক্ট-স্ট্রাকচার)
- [লোকালে চালানোর নিয়ম](#-লোকালে-চালানোর-নিয়ম)
- [Environment Variables](#-environment-variables)
- [OAuth সেটআপ](#-oauth-সেটআপ)
- [Vercel-এ Deploy](#-vercel-এ-deploy)
- [কৃতজ্ঞতা](#-কৃতজ্ঞতা)

---

## 📖 পরিচিতি

**বাজার দর** একটি responsive, বাংলা ভাষার ওয়েব অ্যাপ। বাজারে গিয়ে প্রতিদিন দাম জিজ্ঞেস করার ঝামেলা কমানোই এর উদ্দেশ্য। ব্যবহারকারী ক্যাটাগরি অনুযায়ী পণ্য দেখতে পারেন, কোন পণ্যের দাম গতকালের চেয়ে বেড়েছে বা কমেছে তা এক নজরে বুঝতে পারেন, আর ১২টি আলাদা বাজারের দামের তুলনাও দেখতে পারেন।

প্রজেক্টটি একটি assignment হিসেবে বানানো, যেখানে Next.js 15-এর আধুনিক architecture (Server Components, Client Islands) আর BetterAuth দিয়ে authentication দেখানো হয়েছে।

---

## ✨ মূল ফিচার

| ফিচার | বিস্তারিত |
|-------|-----------|
| 📊 **Live Price Ticker** | হোমপেজে অনবরত চলতে থাকা marquee, যেখানে আজকের দামের পাশে রঙিন badge থাকে: ▲ সবুজ (বেড়েছে), ▼ লাল (কমেছে), — ধূসর (অপরিবর্তিত)। সব সংখ্যা বাংলায়। |
| 📈 **Top Risers & Fallers** | গতকালের তুলনায় যে ৬টি পণ্যের দাম সবচেয়ে বেশি বেড়েছে বা কমেছে, সেগুলো নিজে থেকেই হিসাব হয়ে দেখায়। |
| 🛡️ **Protected Product Page** | লগইন ছাড়া ঢোকা যায় না। ভেতরে আছে সর্বনিম্ন/সর্বোচ্চ/গড় দাম, ৪ সময়ের trend (আজ, গতকাল, সপ্তাহ, মাস) এবং বিভাগসহ ১২ বাজারের দামের টেবিল। |
| 🔍 **Category Page + Bengali Sort** | চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-মুদি, মসলা — ক্যাটাগরি ধরে ব্রাউজ করা যায়। সাজানোর অপশন: ডিফল্ট, দাম কম থেকে বেশি, দাম বেশি থেকে কম। |
| 🔐 **Full Auth Flow** | Email/password, Google ও GitHub login, প্রোফাইল আপডেট, toast notification, আর লগইনের পর আগের পেজে ফেরত যাওয়ার (redirect-back) সুবিধা। |
| 📱 **Fully Responsive** | Mobile-first ডিজাইন, scroll করা যায় এমন ক্যাটাগরি সারি, skeleton loader আর custom 404 পেজ। |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + HeroUI |
| Authentication | BetterAuth (Email + Google + GitHub) |
| Database | MongoDB Atlas (BetterAuth adapter দিয়ে) |
| Notifications | react-toastify |
| Icons | react-icons, @gravity-ui/icons |
| Deployment | Vercel |
| Data API | [api.api-store.workers.dev](https://api.api-store.workers.dev/api/bazardor) |

---

## 🏗 Architecture

প্রজেক্টটি **Server Shell + Client Islands** প্যাটার্নে সাজানো, আর `cacheComponents: true` চালু আছে।

সহজ ভাষায় বললে: পেজের যে অংশগুলো সবার জন্য একই (লোগো, তারিখ, পণ্যের ডেটা) সেগুলো server-এ render হয়, তাই browser-এ কম JavaScript যায় এবং পেজ দ্রুত খোলে। আর যে অংশে user-এর সাথে interaction লাগে (login session দেখানো, বর্তমান path বুঝে menu highlight করা, sort বদলানো), শুধু সেটুকু ছোট ছোট "client island" হিসেবে আলাদা থাকে। যেমন একটা শান্ত পুকুরে কয়েকটা ছোট দ্বীপ, পুরো পুকুরটা নড়ে না, শুধু দ্বীপগুলো সচল।

কয়েকটা সিদ্ধান্ত যা মাথায় রাখা দরকার:

- Runtime-এ নির্ভর করে এমন সব hook (`useSession`, `usePathname`, `useSearchParams`) `<Suspense>` boundary-র ভেতরে রাখা হয়েছে, নইলে build-এর সময় সমস্যা হয়।
- API সব সংখ্যা ইংরেজি digit-এ পাঠায়। `lib/bn.ts` সেগুলোকে বাংলায় রূপান্তর করে।
- API-র কাঁচা ডেটা সরাসরি component-এ যায় না। `lib/mappers.ts` আগে সেটাকে UI-র উপযোগী আকারে সাজিয়ে দেয়।
- Product detail পেজ server-এ session চেক করে, তাই লগইন ছাড়া কেউ URL জানলেও ভেতরে ঢুকতে পারে না।

---

## 📁 প্রজেক্ট স্ট্রাকচার

```text
bazardor/
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/route.ts   # BetterAuth API handler
│   │   ├── category/[id]/page.tsx       # ক্যাটাগরি পেজ (server)
│   │   ├── product/[id]/page.tsx        # Protected পণ্যের বিস্তারিত
│   │   ├── profile/page.tsx             # ইউজার প্রোফাইল
│   │   ├── signin/                      # Sign in (shell + client form)
│   │   ├── signup/page.tsx              # Sign up
│   │   ├── layout.tsx                   # Root layout + ToastContainer
│   │   ├── not-found.tsx                # Custom 404
│   │   └── page.tsx                     # Home
│   ├── components/
│   │   ├── Navbar.tsx                   # Server shell + Suspense
│   │   ├── NavAuth.tsx                  # Client island (session)
│   │   ├── NavCategories.tsx            # Client island (pathname)
│   │   ├── DateLabel.tsx                # ডায়নামিক তারিখ (server)
│   │   ├── Ticker.tsx                   # Marquee
│   │   ├── Hero.tsx                     # Hero section
│   │   ├── ProductCard.tsx              # পণ্যের কার্ড
│   │   ├── CategoryProducts.tsx         # Client sort island
│   │   ├── SortDropdown.tsx             # Sort control
│   │   ├── PasswordInput.tsx            # Show/hide সহ password field
│   │   ├── Skeletons.tsx                # Loading states
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── api.ts                       # Fetch helpers ("use cache")
│   │   ├── mappers.ts                   # Data transformers
│   │   ├── bn.ts                        # বাংলা সংখ্যা helper
│   │   ├── auth.ts                      # BetterAuth (server)
│   │   └── auth-client.ts               # BetterAuth (client)
│   └── types/
│       ├── product.ts
│       ├── category.ts
│       ├── sort.ts
│       └── index.ts
├── public/
│   └── image/                           # লোগো ও hero banner
└── README.md
```

---

## 🚀 লোকালে চালানোর নিয়ম

**যা লাগবে:** Node.js 18+, npm/yarn/pnpm, একটি MongoDB Atlas account (free tier-ই যথেষ্ট), এবং OAuth-এর জন্য Google Cloud Console ও GitHub account।

```bash
git clone https://github.com/aminulislamdev/BazarDor.git
cd bazardor
npm install
```

এরপর নিচের অংশ দেখে `.env.local` ফাইল বানিয়ে dev server চালাও:

```bash
npm run dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) খুললেই অ্যাপ পাবে।

| Command | কাজ |
|---------|-----|
| `npm run dev` | Development server চালায় |
| `npm run build` | Production build বানায় |
| `npm start` | Build করা অ্যাপ চালায় |
| `npm run lint` | Code lint করে |

---

## 🔑 Environment Variables

প্রজেক্টের root-এ `.env.local` নামে ফাইল বানাও:

```env
# API
NEXT_PUBLIC_API=https://api.api-store.workers.dev/api/bazardor

# App URL (শেষে slash দেবে না)
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# BetterAuth secret (কমপক্ষে ৩২ অক্ষর)
BETTER_AUTH_SECRET=your-super-secret-random-string

# MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bazardor

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

> 💡 Secret বানাতে চাইলে terminal-এ `openssl rand -base64 32` চালাও।
>
> 🔒 `.env.local` কখনো GitHub-এ push করবে না। এতে তোমার database আর OAuth-এর গোপন চাবি থাকে।

---

## 🔐 OAuth সেটআপ

Provider-কে জানাতে হয় login শেষে user-কে কোথায় ফেরত পাঠানো যাবে, নইলে `redirect_uri_mismatch` error আসে। লোকাল আর live, দুই URL-ই যোগ করে রাখো।

**Google Cloud Console**

| Field | মান |
|-------|-----|
| Authorized JavaScript origins | `http://localhost:3000` এবং `https://bazardor-nu.vercel.app` |
| Authorized redirect URIs | `http://localhost:3000/api/auth/callback/google` এবং `https://bazardor-nu.vercel.app/api/auth/callback/google` |

**GitHub OAuth App**

| Field | মান |
|-------|-----|
| Homepage URL | `https://bazardor-nu.vercel.app` |
| Authorization callback URL | `https://bazardor-nu.vercel.app/api/auth/callback/github` |

> GitHub একটা OAuth App-এ একটাই callback URL রাখতে দেয়। তাই লোকালে test করতে চাইলে আলাদা একটা dev OAuth App বানিয়ে নেওয়াই সহজ।

---

## ☁️ Vercel-এ Deploy

1. কোড GitHub-এ push করো।
2. [vercel.com](https://vercel.com)-এ repo import করো।
3. উপরের সব environment variable Vercel-এর Settings-এ যোগ করো (`BETTER_AUTH_URL` ও `NEXT_PUBLIC_APP_URL`-এ live URL দেবে)।
4. Deploy চাপো।

> ⚠️ **গুরুত্বপূর্ণ:** `NEXT_PUBLIC_*` variable বদলালে অবশ্যই **build cache ছাড়া** redeploy করতে হবে। কারণ এই মানগুলো build-এর সময় কোডের ভেতরে বসে যায়, cache থাকলে পুরনো মান থেকে যায়।

---

## 🙏 কৃতজ্ঞতা

- Data API: [api-store.workers.dev](https://api.api-store.workers.dev/api/bazardor)
- Icons: [Gravity UI](https://gravity-ui.com/) ও [React Icons](https://react-icons.github.io/react-icons/)
- UI components: [HeroUI](https://www.heroui.com/)
- Authentication: [BetterAuth](https://better-auth.com/)

## 📝 License

এটি assignment submission হিসেবে বানানো। শেখার উদ্দেশ্যে যে কেউ ব্যবহার করতে পারবে।

<p align="center">Made with ❤️ by Aminul Islam</p>