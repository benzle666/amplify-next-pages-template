import Body from "@/components/layout/Body";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Link from "next/link";
import Image from "next/image";

import PricingPanel , { PricingPlan } from "@/components/ui/PricingPanel";
import CopyPalate from "@/components/ui/CopyPalate";

const plans: PricingPlan[] = [
  {
    name: 'Beginner',
    price: '$ Free',
    description: 'Great for testing out our product and infrequent learning.',
    features: ['Energy: 1 per 6 days & 23 hours', 'Only IELTS & Casual formats', 'Only random topics'],
  },
  {
    name: 'Pro',
    price: '$20 / mo',
    description: 'Perfect for people taking test in less than a month!',
    features: ['Energy: 1 per 23 hours', 'All & custom format', 'Custom topic'],
    isPopular: true,
    ctaText: 'Choose Pro',
    onCTAClick: () => alert('Pro plan selected!'),
  },
  {
    name: 'Educator',
    price: 'Contact Us',
    description: 'Get discounted credit for your students.',
    features: ['Dedicated Support', 'Custom Integrations'],
    ctaText: 'Contact Sales',
    onCTAClick: () => alert('Sales team will contact you shortly.'),
  },
]

export default function HomePage() {
  return (
    <Layout>
      <div className="relative h-120 w-full mb-20">
        <Image src="/gemini-orange-background.png" alt="Background" fill objectFit="cover"></Image>

        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex inline-flex h-8"></div>
            <div className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">TalkAura</div>
            <Link
              href="/user/practice"
              className="inline-block bg-orange-500 hover:bg-orange-600 
                        text-white font-bold text-xl px-8 py-4
                        rounded-full shadow-lg
                        animate-bounce transition-colors duration-300"
            >
              Lets go!
            </Link>
          </div>
        </div>
      </div>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-240 w-full">
          <div className="flex justify-center items-center h-120 mb-20">
            <div 
              className="text-3xl font-extrabold text-white text-center"
              style={{
                  textShadow: `
                    2px 2px 0 black,
                    -2px 2px 0 black,
                    2px -2px 0 black,
                    -2px -2px 0 black
                  `
                }}>
              Get real speaking experience, with AI.
            </div>
            <Image src="/logo.png" width={400} height={400} alt="image"/>
          </div>
          <div className="flex justify-center items-center h-120 mb-20">
            <Image src="/logo.png" width={400} height={400} alt="image" className="transform scale-x-[-1]"/>
            <div 
              className="text-3xl font-extrabold text-white text-center"
              style={{
                  textShadow: `
                    2px 2px 0 black,
                    -2px 2px 0 black,
                    2px -2px 0 black,
                    -2px -2px 0 black
                  `
                }}>
              Prepare for imigration and language proficiency tests.
            </div>
            <div className="p-4 m-4"></div>
          </div>
          <div className="flex justify-center items-center h-120 mb-20">
            <div 
              className="text-3xl font-extrabold text-white text-center"
              style={{
                  textShadow: `
                    2px 2px 0 black,
                    -2px 2px 0 black,
                    2px -2px 0 black,
                    -2px -2px 0 black
                  `
                }}>
              In any language, in any format.
            </div>
            <Image src="/logo.png" width={400} height={400} alt="image"/>
          </div>
          {/* <div className="flex justify-center items-center h-120 mb-20">
            <div className="flex flex-col">
              <div 
                className="text-3xl font-extrabold text-white mb-8"
                style={{
                    textShadow: `
                      2px 2px 0 black,
                      -2px 2px 0 black,
                      2px -2px 0 black,
                      -2px -2px 0 black
                    `
                  }}>
                Get your prompt!
              </div>
              <div className="text-bold mb-8 pr-8">
                Honestly, you can practice on ChatGPT or any platform. Just copy these materials. Only subcript for our product when you ran out of credit!
              </div>
            </div>
            <CopyPalate
              tabs={[
                { label: "IELTS", content: "console.log('Hello World');" },
                { label: "TOEIC", content: "print('Hello World')" },
                { label: "Casual", content: "<h1>Hello World</h1>" },
              ]}
            />
          </div> */}
          <div className="flex flex-col justify-center items-center h-120 mb-20 text-3xl text-bold">
            Pricing
            <PricingPanel plans={plans} />
          </div>
          <div className="flex justify-center items-center h-120 mb-20">
            <div className="flex flex-col">
              <div className="text-3xl text-bold mb-6">About us.</div>
              <div className="text-bold mb-8 pr-8">
                We came from Vietnam! We are here to challange ourself and deliver the best product to the whole world.
              </div>
            </div>
            <Image src="/logo.png" width={400} height={400} alt="image"/>
          </div>
        </div>
      </main>
      <footer className="bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          Developer Section
          <div>
            <h3 className="font-bold mb-4">Developer</h3>
            <ul className="space-y-2">
              <li><Link href="/docs">Docs</Link></li>
              <li><Link href="/api">API</Link></li>
              <li><Link href="/open-source">Open Source</Link></li>
            </ul>
          </div>

          Merchant Section
          <div>
            <h3 className="font-bold mb-4">Merchant</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>

          Legal / Other Section
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
            </ul>
          </div> */}
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TalkAura. All rights reserved.
        </div>
      </footer>
    </Layout>
  )
}