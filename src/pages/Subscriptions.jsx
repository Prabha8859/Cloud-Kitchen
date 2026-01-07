import React from "react";
import { Check, CreditCard, Zap, Shield } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/UI/PageHeader";
import Button from "../components/UI/Button";

const plans = [
  {
    id: "starter",
    name: "Starter Kitchen",
    price: "₹999",
    period: "/month",
    description: "Perfect for home bakers and small cloud kitchens.",
    features: ["Up to 100 Orders/month", "Basic Analytics", "1 Kitchen Profile", "Email Support"],
    highlight: false,
    icon: CreditCard,
    color: "blue"
  },
  {
    id: "growth",
    name: "Growth Partner",
    price: "₹2,499",
    period: "/month",
    description: "For growing brands scaling their operations.",
    features: ["Up to 1000 Orders/month", "Advanced Analytics", "3 Kitchen Profiles", "Priority Support", "Marketing Tools"],
    highlight: true,
    icon: Zap,
    color: "orange"
  },
  {
    id: "enterprise",
    name: "Enterprise Hub",
    price: "₹5,999",
    period: "/month",
    description: "Full control for large chains and franchises.",
    features: ["Unlimited Orders", "Custom Reports", "Unlimited Profiles", "24/7 Dedicated Support", "API Access", "White-label App"],
    highlight: false,
    icon: Shield,
    color: "purple"
  }
];

export default function Subscriptions() {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Subscription Plans" 
        subtitle="Choose the best plan for your kitchen business" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col
              ${plan.highlight 
                ? 'border-orange-500 ring-2 ring-orange-500/20 dark:ring-orange-500/10' 
                : 'border-slate-200 dark:border-slate-700'
              }
            `}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                Most Popular
              </div>
            )}

            <div className="p-8 flex-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6
                ${plan.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                  plan.color === 'orange' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 
                  'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                }
              `}>
                <plan.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{plan.description}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400 ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={18} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-orange-500' : 'text-green-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <Button 
                variant={plan.highlight ? 'primary' : 'secondary'}
                className="w-full"
                size="lg"
              >
                {plan.highlight ? 'Get Started Now' : 'Choose Plan'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}