import Body from "@/components/layout/Body";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import PricingPanel , { PricingPlan } from "@/components/ui/PricingPanel";

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$9/mo',
    description: 'Great for personal use',
    features: ['1 Website', 'Email Support', 'Basic Analytics'],
  },
  {
    name: 'Pro',
    price: '$29/mo',
    description: 'Perfect for growing teams',
    features: ['5 Websites', 'Priority Support', 'Advanced Analytics'],
    isPopular: true,
    ctaText: 'Choose Pro',
    onCTAClick: () => alert('Pro plan selected!'),
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'Custom solutions for large organizations',
    features: ['Unlimited Websites', 'Dedicated Support', 'Custom Integrations'],
    ctaText: 'Contact Sales',
  },
]

export default function SettingPage() {
  return (
    <Layout>
      <Header pageTitle="Setting"/>
      <Body>
        <div className="space-y-6">

          {/* Pricing plan */}
          <PricingPanel plans={plans} />


          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <span className="text-gray-700">Dark Mode</span>
            <button className="bg-gray-200 rounded-full w-12 h-6 flex items-center p-1">
              <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-0"></div>
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <span className="text-gray-700">Language</span>
            <select className="border rounded px-2 py-1">
              <option>English</option>
              <option>Tiếng Việt</option>
              <option>Español</option>
            </select>
          </div>

          {/* Notification Preference */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <span className="text-gray-700">Notifications</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>

          {/* Logout */}
          <button className="w-full text-red-600 border border-red-300 hover:bg-red-50 rounded-lg py-2 transition">
            Log out
          </button>
        </div>
      </Body>
      <Footer/>
    </Layout>
  );
}