// components/PricingPanel.tsx
import React from 'react'

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
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
          className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
            plan.isPopular ? 'border-blue-600' : 'border-gray-200'
          }`}
        >
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

          <button
            onClick={plan.onCTAClick}
            className={`mt-6 w-full rounded-xl px-4 py-2 text-white font-medium ${
              plan.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'
            }`}
          >
            {plan.ctaText || 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default PricingPanel
