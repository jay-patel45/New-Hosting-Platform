import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Languages,
  MessageCircle,
  Network,
  PanelsTopLeft,
  PlayCircle,
  Scale,
  Server,
  TrendingUp,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { IndiaOutline } from "../components/brand/IndiaOutline";
import { ButtonLink } from "../components/ui/ButtonLink";
import { CountStat } from "../components/ui/CountStat";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SourceLine } from "../components/ui/SourceLine";

type Lang = "en" | "hi";

const copy = {
  en: {
    logoLine: "India's zero-surprise hosting layer",
    navCta: "Schedule a Call",
    heroEyebrow: "Seed round investor pitch",
    heroHeadline:
      "6.3 Crore Indian Businesses Are Still Waiting for the Right Hosting Layer.",
    heroSub:
      "ApnaHost is building India's first MSME-native web hosting platform in Indian languages, on UPI, with a price that never jumps at renewal.",
    watchDeck: "Watch Pitch Deck",
    readResearch: "Read Research",
    problemTitle: "The Gap No One Is Talking About",
    solutionTitle: "ApnaHost: Built for Real India",
    marketTitle: "A $32.9 Billion Market With a Missing Product",
    modelTitle: "How We Make Money",
    gtmTitle: "How We Reach 100,000 Customers",
    gapsTitle: "8 Verified Market Gaps. One Company.",
    nowTitle: "3 Tailwinds Hitting at Once",
    teamTitle: "Built by People Who Understand Bharat",
    askTitle: "We're Raising ₹1.5 Crore Seed Round",
    schedule: "Schedule a Call",
    download: "Download Full Deck",
    footerTag: "Jo price pe aaye, woh price pe raho. Hamesha.",
  },
  hi: {
    logoLine: "Bharat ka zero-surprise hosting layer",
    navCta: "Call Schedule Karein",
    heroEyebrow: "Seed round investor pitch",
    heroHeadline:
      "6.3 Crore Bharatiya Businesses Ko Abhi Bhi Sahi Hosting Layer Chahiye.",
    heroSub:
      "ApnaHost Indian languages, UPI monthly billing, aur same renewal price ke saath MSME-native hosting bana raha hai.",
    watchDeck: "Pitch Deck Dekhein",
    readResearch: "Research Padhein",
    problemTitle: "Jis Gap Par Koi Baat Nahi Kar Raha",
    solutionTitle: "ApnaHost: Real India Ke Liye Built",
    marketTitle: "$32.9B Market, Par MSME-Native Product Missing",
    modelTitle: "Hum Revenue Kaise Banate Hain",
    gtmTitle: "100,000 Customers Tak Ka Roadmap",
    gapsTitle: "8 Verified Market Gaps. Ek Company.",
    nowTitle: "3 Tailwinds Ek Saath",
    teamTitle: "Bharat Ko Samajhne Wali Team",
    askTitle: "Hum ₹1.5 Crore Seed Round Raise Kar Rahe Hain",
    schedule: "Call Schedule Karein",
    download: "Full Deck Download",
    footerTag: "Jo price pe aaye, woh price pe raho. Hamesha.",
  },
} as const;

const sources = {
  imarc: "https://www.imarcgroup.com/india-web-hosting-services-market",
  pib: "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1992842",
  udyam: "https://www.udyamregistration.gov.in/",
  iamai:
    "https://www.iamai.in/research/internet-india-2024-kantariamai-report",
  meity:
    "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf",
  hostinger: "https://www.hostinger.com/in/pricing",
  godaddy: "https://www.godaddy.com/en-in/hosting/web-hosting",
  bigrock: "https://www.bigrock.in/web-hosting/pc-wh-change-hosting",
};

const heroStats = [
  {
    value: 6.3,
    decimals: 1,
    suffix: "Cr",
    label: { en: "MSMEs", hi: "MSMEs" },
    source: "PIB, Ministry of MSME",
    href: sources.pib,
  },
  {
    value: 32.9,
    decimals: 1,
    prefix: "$",
    suffix: "B",
    label: { en: "market by 2033", hi: "2033 market" },
    source: "IMARC Group",
    href: sources.imarc,
  },
  {
    value: 0,
    suffix: "",
    label: { en: "surprise renewals", hi: "surprise renewals" },
    source: "ApnaHost pricing thesis",
    href: "#business-model",
  },
];

const problemCards = [
  {
    anchor: "6.3Cr",
    title: {
      en: "MSMEs, Uneven Digital Presence",
      hi: "MSME Digital Gap",
    },
    body:
      "India has more than 6.30 crore MSMEs, yet very small businesses still struggle with websites, technical setup, and reliable online identity.",
    source: "PIB MSME base; GoDaddy/RedShift SMB website survey",
  },
  {
    anchor: "3-4x",
    title: {
      en: "Intro Prices Hide Renewal Shock",
      hi: "Renewal Shock Chhupa Hua Hai",
    },
    body:
      "Major hosting plans often show steep first-term discounts and much higher renewal prices. MSMEs need predictable monthly pricing.",
    source: "Hostinger, GoDaddy India, BigRock pricing pages",
  },
  {
    anchor: "488M",
    title: {
      en: "Bharat Is Not Mumbai",
      hi: "Bharat Sirf Mumbai Nahi Hai",
    },
    body:
      "Rural India has 488M active internet users and Indic-language internet usage is mainstream. Hosting still assumes English, annual cards, and technical confidence.",
    source: "IAMAI-Kantar Internet in India 2024",
  },
];

const pillars: Array<{
  icon: LucideIcon;
  title: Record<Lang, string>;
  body: string;
}> = [
  {
    icon: MessageCircle,
    title: { en: "WhatsApp Onboarding", hi: "WhatsApp Onboarding" },
    body:
      "Send your business name on WhatsApp. Get your website live in 30 minutes with assisted setup.",
  },
  {
    icon: CreditCard,
    title: { en: "UPI Monthly Billing", hi: "UPI Monthly Billing" },
    body:
      "₹149/month, paid via UPI. No annual lock-in, no surprise renewal jump, no card anxiety.",
  },
  {
    icon: Languages,
    title: { en: "Hindi-First Dashboard", hi: "Hindi-First Dashboard" },
    body:
      "Hindi first, then Tamil, Telugu, and Gujarati. Support in your language, 9AM-9PM IST.",
  },
  {
    icon: Zap,
    title: { en: "Festive Auto-Scale", hi: "Festive Auto-Scale" },
    body:
      "Diwali Mode gives D2C stores one-click traffic headroom for Indian eCommerce spikes.",
  },
];

const comparisonRows = [
  ["Language support", "English-led", "Hindi-first, regional roadmap"],
  ["Monthly UPI billing", "Often annual-first", "UPI monthly by default"],
  ["Same renewal price", "Discounted intro, higher renewal", "Join price stays"],
  ["WhatsApp onboarding", "Ticket or DIY setup", "Assisted WhatsApp flow"],
  ["India DC", "Mixed global footprint", "India-first infrastructure"],
  ["GST invoice", "Available, not MSME-native", "Clean GST invoice flow"],
];

const marketBars = [
  { name: "2024", value: 11, label: "$11B" },
  { name: "2033", value: 32.9, label: "$32.9B" },
];

const funnel = [
  { label: "MSME base", value: "6.3Cr", note: "Total Indian MSME universe" },
  {
    label: "Early wedge",
    value: "100K",
    note: "Year 3 operating target",
  },
  {
    label: "Long-term upside",
    value: "2M",
    note: "₹358Cr ARR at ₹149/month",
  },
];

const revenueStreams: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: Server,
    title: "Hosting Plans",
    body: "₹149-699/month per customer with target 70% gross margin from day one.",
  },
  {
    icon: PanelsTopLeft,
    title: "Agency White-Label",
    body: "₹2,499-6,999/month for web agencies managing client sites in bulk.",
  },
  {
    icon: TrendingUp,
    title: "Festive Surge Mode",
    body: "₹499 per activation for seasonal traffic spikes across D2C and retail sellers.",
  },
];

const projections = [
  { year: "Year 1", customers: "5,000", arr: "₹89L ARR", focus: "Reseller launch" },
  { year: "Year 2", customers: "25,000", arr: "₹4.5Cr ARR", focus: "Agency + content" },
  { year: "Year 3", customers: "100,000", arr: "₹18Cr ARR", focus: "CSC and infra scale" },
];

const phases = [
  {
    phase: "Phase 1",
    time: "Months 1-3",
    target: "500 customers",
    body: "Launch reseller model and WhatsApp community marketing in Hindi.",
  },
  {
    phase: "Phase 2",
    time: "Months 3-6",
    target: "5,000 customers",
    body: "Publish Hindi YouTube tutorials and open agency partnership program.",
  },
  {
    phase: "Phase 3",
    time: "Months 6-18",
    target: "25,000 customers",
    body: "Build CSC reseller network across Tier 2 and Tier 3 cities.",
  },
  {
    phase: "Phase 4",
    time: "Year 2-3",
    target: "100,000 customers",
    body: "Move toward own infrastructure and DPDP compliance-ready products.",
  },
];

const gapCards = [
  ["63M+ MSME base", "India has a massive fragmented business universe still moving online."],
  ["DPDP-ready hosting", "Compliance pressure creates demand for India-first data and controls."],
  ["Indian deploy platform", "Developers need local rails, predictable bills, and Indian support."],
  ["Affordable GPU cloud", "AI startups need entry pricing that does not begin at hyperscaler scale."],
  ["Agency white-label", "Small agencies need hosting inventory with billing and client controls."],
  ["Festive auto-scaling", "Indian D2C traffic spikes around festival calendars, not generic holidays."],
  ["Transparent renewals", "No surprise renewal pricing is a wedge against discount-led incumbents."],
  ["Tier 2/3 regional hosting", "Support, language, and payments must fit real Bharat workflows."],
];

const tailwinds: Array<{
  icon: LucideIcon;
  stat: string;
  body: string;
  source: string;
  href: string;
}> = [
  {
    icon: Scale,
    stat: "DPDP Rules 2025",
    body:
      "Rules notified in November 2025 create a compliance window for Indian businesses handling personal data.",
    source: "MeitY DPDP Rules, 2025",
    href: sources.meity,
  },
  {
    icon: Network,
    stat: "2.18L+ GPs",
    body:
      "BharatNet service-ready gram panchayats and fixed broadband growth are making rural demand reachable.",
    source: "PIB BharatNet status, 2025",
    href: "https://www.pib.gov.in/PressReleasePage.aspx/pib.gov.in/Pressreleaseshare.aspx?PRID=2123137",
  },
  {
    icon: UsersRound,
    stat: "6.3Cr MSMEs",
    body:
      "The policy and market pressure to digitize MSMEs keeps compounding, but the hosting product is still not native to them.",
    source: "PIB, Ministry of MSME",
    href: sources.pib,
  },
];

const team = [
  {
    initials: "AK",
    name: "Aarav Kumar",
    role: "Founder & CEO",
    note: "Built reseller hosting and MSME websites across North India.",
  },
  {
    initials: "NP",
    name: "Nisha Patel",
    role: "Product Lead",
    note: "Led vernacular onboarding and support tools for SMB SaaS.",
  },
  {
    initials: "RS",
    name: "Rohan Sharma",
    role: "Infrastructure Advisor",
    note: "Cloud reliability background across Indian eCommerce workloads.",
  },
];

const fundUse = [
  ["40%", "Infrastructure & Reseller Setup"],
  ["25%", "Product Development"],
  ["20%", "Marketing & Community"],
  ["15%", "First 2 Hires"],
];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const chartData = useMemo(() => marketBars, []);

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-saffron text-lg font-black">
              A
            </span>
            <span className="min-w-0">
              <span className="block text-base font-black leading-tight">
                ApnaHost
              </span>
              <span className="hidden text-xs text-white/62 sm:block">
                {t.logoLine}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="grid grid-cols-2 rounded-md border border-white/18 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded px-2.5 py-1.5 transition ${
                  lang === "en"
                    ? "bg-white text-navy"
                    : "text-white/70 hover:text-white"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`rounded px-2.5 py-1.5 transition ${
                  lang === "hi"
                    ? "bg-white text-navy"
                    : "text-white/70 hover:text-white"
                }`}
                aria-pressed={lang === "hi"}
              >
                हिंदी
              </button>
            </div>
            <a
              href="mailto:founder@apnahost.in?subject=ApnaHost%20Seed%20Round"
              className="hidden rounded-md bg-saffron px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e85f00] sm:inline-flex"
            >
              {t.navCta}
            </a>
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative isolate overflow-hidden bg-navy px-4 pb-20 pt-16 text-white sm:px-6 md:pb-28 md:pt-24 lg:px-8"
      >
        <IndiaOutline />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="mb-5 inline-flex rounded-md border border-saffron/35 bg-saffron/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-saffron">
              {t.heroEyebrow}
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl md:text-6xl">
              {t.heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              {t.heroSub}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/apnahost-pitch-deck.pdf" icon={PlayCircle}>
                {t.watchDeck}
              </ButtonLink>
              <ButtonLink
                href="/apnahost-research.pdf"
                variant="outline"
                icon={FileText}
              >
                {t.readResearch}
              </ButtonLink>
            </div>
            <p className="mt-6 max-w-xl text-sm text-white/56">
              Tagline: {t.footerTag}
            </p>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {heroStats.map((stat) => (
              <CountStat
                key={stat.label.en}
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label[lang]}
                source={stat.source}
                href={stat.href}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.problemTitle}
            subtitle="The hosting market has grown up around domains, coupons, and English dashboards. Indian MSMEs need a different default."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {problemCards.map((card) => (
              <article
                key={card.anchor}
                className="rounded-lg border border-line bg-white p-6 shadow-soft"
              >
                <div className="text-5xl font-black tracking-normal text-saffron">
                  {card.anchor}
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  {card.title[lang]}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
                <p className="mt-5 text-xs leading-relaxed text-muted">
                  Source: {card.source}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.solutionTitle}
            subtitle="A hosting product that starts where Bharat's business owner already is: WhatsApp, UPI, language comfort, and predictable cash flow."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title.en}
                  className="rounded-lg border border-line bg-white p-6 shadow-soft"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-saffron/12 text-saffron">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy">
                    {pillar.title[lang]}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-line bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="px-5 py-4 font-bold">Feature</th>
                    <th className="px-5 py-4 font-bold">Others</th>
                    <th className="px-5 py-4 font-bold">ApnaHost</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([feature, others, apna]) => (
                    <tr key={feature} className="border-t border-line">
                      <td className="px-5 py-4 font-bold text-navy">
                        {feature}
                      </td>
                      <td className="px-5 py-4 text-muted">{others}</td>
                      <td className="px-5 py-4 text-ink">
                        <span className="inline-flex items-center gap-2 font-semibold">
                          <CheckCircle2
                            className="h-4 w-4 text-mint"
                            aria-hidden="true"
                          />
                          {apna}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.marketTitle}
            subtitle="The category is already large. The missing product is a trust-first hosting layer designed around India's MSME operating reality."
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-line bg-white p-5 shadow-soft md:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-white">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-navy">Hosting Market Growth</h3>
                  <p className="text-sm text-muted">USD billion, India</p>
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 36]} />
                    <Tooltip
                      cursor={{ fill: "rgba(12,31,74,0.05)" }}
                      formatter={(value) => [`$${value}B`, "Market size"]}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={72}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={index === 0 ? "#0C1F4A" : "#FF6B00"}
                        />
                      ))}
                      <LabelList
                        dataKey="label"
                        position="top"
                        className="fill-navy text-sm font-bold"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <SourceLine>
                Source:{" "}
                <a className="underline underline-offset-4" href={sources.imarc}>
                  IMARC Group
                </a>{" "}
                cites India web hosting services market at $11.00B in 2024,
                projected to reach $32.90B by 2033 at 11.60% CAGR.
              </SourceLine>
            </div>

            <div className="grid gap-4">
              {funnel.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-line bg-white p-6 shadow-soft"
                >
                  <div className="text-4xl font-black text-saffron">
                    {item.value}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-navy">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.note}
                  </p>
                </div>
              ))}
              <SourceLine>
                MSME base source:{" "}
                <a className="underline underline-offset-4" href={sources.pib}>
                  PIB / Ministry of MSME
                </a>
                . Current registration context:{" "}
                <a className="underline underline-offset-4" href={sources.udyam}>
                  Udyam factsheet
                </a>
                .
              </SourceLine>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="business-model"
        className="bg-[#F8FAFC] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.modelTitle}
            subtitle="Simple recurring plans, plus agency and seasonal products that match how Indian digital demand actually arrives."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {revenueStreams.map((stream) => {
              const Icon = stream.icon;
              return (
                <article
                  key={stream.title}
                  className="rounded-lg border border-line bg-white p-6 shadow-soft"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy">
                    {stream.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {stream.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border border-line bg-white shadow-soft">
            <div className="grid bg-navy px-5 py-4 text-sm font-bold text-white md:grid-cols-4">
              <span>Year</span>
              <span className="hidden md:block">Customers</span>
              <span className="hidden md:block">ARR</span>
              <span className="hidden md:block">Operating focus</span>
            </div>
            {projections.map((row) => (
              <div
                key={row.year}
                className="grid gap-2 border-t border-line px-5 py-4 text-sm md:grid-cols-4 md:gap-0"
              >
                <strong className="text-navy">{row.year}</strong>
                <span className="text-muted">{row.customers} customers</span>
                <span className="font-bold text-saffron">{row.arr}</span>
                <span className="text-muted">{row.focus}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.gtmTitle}
            subtitle="Distribution starts with trusted human channels, then compounds through content, agencies, and CSC-style local access."
          />
          <div className="relative grid gap-5 md:grid-cols-4">
            {phases.map((phase, index) => (
              <article
                key={phase.phase}
                className="rounded-lg border border-line bg-white p-6 shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-saffron text-base font-black text-white">
                  {index + 1}
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {phase.time}
                </p>
                <h3 className="mt-2 text-xl font-bold text-navy">
                  {phase.phase}
                </h3>
                <p className="mt-2 font-bold text-saffron">{phase.target}</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {phase.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-navy px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.gapsTitle}
            subtitle="The company starts with MSME hosting, but the infrastructure wedge opens adjacent product lines."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gapCards.map(([title, body], index) => (
              <article
                key={title}
                className="rounded-lg border border-white/12 bg-white/[0.06] p-5"
              >
                <div className="text-3xl font-black text-saffron">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.nowTitle}
            subtitle="Regulation, rural connectivity, and MSME digitization are converging into the same buying moment."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {tailwinds.map((tailwind) => {
              const Icon = tailwind.icon;
              return (
                <article
                  key={tailwind.stat}
                  className="rounded-lg border border-line bg-white p-6 shadow-soft"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-saffron/12 text-saffron">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="mt-5 text-3xl font-black text-navy">
                    {tailwind.stat}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {tailwind.body}
                  </p>
                  <a
                    href={tailwind.href}
                    className="mt-5 block text-xs text-muted underline underline-offset-4 hover:text-navy"
                  >
                    Source: {tailwind.source}
                  </a>
                </article>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.teamTitle}
            subtitle="Early-stage team placeholders for the investor site, ready to swap with actual founder details."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.initials}
                className="rounded-lg border border-line bg-white p-6 shadow-soft"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-navy text-lg font-black text-white">
                  {member.initials}
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-bold text-saffron">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {member.note}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-navy px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-saffron">
                Fundraising CTA
              </p>
              <h2 className="text-3xl font-black tracking-normal md:text-5xl">
                {t.askTitle}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
                Capital goes into infrastructure, product, distribution, and the
                first core team so ApnaHost can reach its first 100,000 MSME
                customers.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="mailto:founder@apnahost.in?subject=ApnaHost%20Seed%20Round"
                  icon={Calendar}
                >
                  {t.schedule}
                </ButtonLink>
                <ButtonLink
                  href="/apnahost-pitch-deck.pdf"
                  variant="outline"
                  icon={Download}
                >
                  {t.download}
                </ButtonLink>
              </div>
              <p className="mt-6 text-sm text-white/58">
                Contact:{" "}
                <a
                  className="font-bold text-white underline-offset-4 hover:underline"
                  href="mailto:founder@apnahost.in"
                >
                  founder@apnahost.in
                </a>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fundUse.map(([percent, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/12 bg-white/[0.06] p-6"
                >
                  <div className="text-4xl font-black text-saffron">
                    {percent}
                  </div>
                  <p className="mt-3 text-sm font-bold leading-6 text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-base font-black text-white">
                A
              </span>
              <div>
                <p className="font-black text-navy">ApnaHost</p>
                <p className="text-sm text-muted">{t.footerTag}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted md:text-right">
            <p>Made with pride in India 🇮🇳</p>
            <a
              href="mailto:founder@apnahost.in"
              className="font-bold text-navy underline-offset-4 hover:underline"
            >
              founder@apnahost.in
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
