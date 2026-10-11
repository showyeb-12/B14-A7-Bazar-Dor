import Image from "next/image";

const STATS = [
  { value: "৩৩+", label: "নিত্যপণ্য" },
  { value: "৮", label: "ক্যাটাগরি" },
  { value: "১২", label: "বাজার" },
];

export default function Hero() {
  return (
    <section className="border-b border-base-300 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="badge badge-primary badge-outline gap-1.5 font-medium">
            <span aria-hidden>🟢</span> প্রতিদিন হালনাগাদ বাজারদর
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            প্রয়োজনীয় পণ্যের{" "}
            <span className="text-primary">দাম এক নজরে</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-base-content/70 lg:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস থেকে শুরু করে নিত্যপ্রয়োজনীয় সব
            পণ্যের আজকের দাম, দাম বাড়া-কমা আর বাজারভিত্তিক তুলনা — সবই এক
            জায়গায়।
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#সব-পণ্য" className="btn btn-primary btn-md sm:btn-lg">
              সব পণ্য দেখুন ↓
            </a>
            <a
              href="#বেড়েছে"
              className="btn btn-outline btn-md sm:btn-lg"
            >
              দাম বেড়েছে ▲
            </a>
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 lg:mx-0">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-base-300 bg-base-100 px-3 py-3 text-center shadow-sm"
              >
                <dt className="text-xl font-extrabold text-primary sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="text-xs font-medium text-base-content/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          <Image
            src="/hero-market.svg"
            alt="কাঁচাবাজারের ঝুড়িতে চাল, মাছ, সবজি ও মাংস"
            width={640}
            height={480}
            priority
            className="h-auto w-full drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
