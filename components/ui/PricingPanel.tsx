// components/PricingPanel.tsx
import React from 'react'

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  isCurrent?: boolean
  ctaText?: string
  onCTAClick?: () => void
}

interface PricingPanelProps {
  plans: PricingPlan[]
}

const PricingPanel: React.FC<PricingPanelProps> = ({ plans }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`flex flex-col justify-between min-h-100 rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
            plan.isCurrent
              ? 'border-green-600 bg-green-50'
              : plan.isPopular
              ? 'border-blue-600'
              : 'border-gray-200'
          }`}
        >
          <div>
            {plan.isCurrent && (
              <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                Your Current Plan
              </span>
            )}

            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-3xl font-bold mt-2">{plan.price}</p>
            <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-sm text-gray-700">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={plan.onCTAClick}
            disabled={plan.isCurrent}
            className={`mt-6 w-full rounded-xl px-4 py-2 text-white font-medium transition ${
              plan.isCurrent
                ? 'bg-green-600 cursor-not-allowed opacity-70'
                : plan.isPopular
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-800 hover:bg-gray-900'
            }`}
          >
            {plan.isCurrent ? 'Current Plan' : plan.ctaText || 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default PricingPanel

// Usage Guide
// // pages/PricingPage.tsx
// import React from 'react'
// import PricingPanel, { PricingPlan } from '../components/PricingPanel'

// const plans: PricingPlan[] = [
//   {
//     name: 'Free',
//     price: '$0',
//     description: 'Perfect for individuals and hobby projects.',
//     features: ['1 Project', 'Basic Support', 'Community Access'],
//     isCurrent: true,
//     onCTAClick: () => alert('Already on this plan'),
//   },
//   {
//     name: 'Pro',
//     price: '$19/month',
//     description: 'Great for professionals and growing teams.',
//     features: ['10 Projects', 'Priority Support', 'Advanced Tools'],
//     isPopular: true,
//     onCTAClick: () => alert('Pro plan selected'),
//   },
//   {
//     name: 'Enterprise',
//     price: 'Custom',
//     description: 'For large teams and enterprise needs.',
//     features: ['Unlimited Projects', 'Dedicated Support', 'Custom SLAs'],
//     ctaText: 'Contact Sales',
//     onCTAClick: () => alert('Contacting sales...'),
//   },
// ]

// const PricingPage: React.FC = () => {
//   return (
//     <div className="max-w-6xl mx-auto py-12">
//       <h1 className="text-4xl font-bold text-center mb-10">Choose Your Plan</h1>
//       <PricingPanel plans={plans} />
//     </div>
//   )
// }

// export default PricingPage