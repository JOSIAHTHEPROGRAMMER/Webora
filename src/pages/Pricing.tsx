import { useState } from "react";
import { appPlans } from "../assets/assets";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";
import type { plan } from "@/types";

const Pricing = () => {
  const { data: session } = authClient.useSession();
  const [plans] = useState<plan[]>(appPlans);

  const handlePurchase = async (planId: string) => {
    try {
      if (!session?.user) {
        return toast("Please log in to purchase credits");
      }
      const { data } = await api.post("/api/user/purchase-credits", {
        planId,
      });
      window.location.href = data.payment_link;
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh]">
        <div className="text-center mt-16">
          <h1 className="text-3xl font-medium text-gray-100">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 mt-2 max-w-md mx-auto text-sm">
            Start for free and scale up as you grow. Find the perfect plan for
            your content creation needs.
          </p>
        </div>

        <div className="pt-14 py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="p-6 bg-black/20 ring ring-teal-900/40 mx-auto 
                           w-full max-w-sm rounded-lg text-white shadow-lg 
                           hover:ring-teal-400 transition-all duration-400"
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>

                <div className="my-2">
                  <span className="text-4xl font-bold text-teal-300">
                    {plan.price}
                  </span>
                  <span className="text-gray-300">
                    {" "}
                    / {plan.credits} credits
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{plan.description}</p>

                <ul className="space-y-1.5 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-emerald-400 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan.id)}
                  className="w-full py-2 px-4 text-sm rounded-md 
                             bg-linear-to-r from-teal-500 to-cyan-500
                             hover:from-teal-400 hover:to-cyan-400
                             active:scale-95 transition-all"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto text-center text-sm max-w-md mt-10 text-white/60 font-light">
          Project{" "}
          <span className="text-emerald-300 px-1">Creation / Revision</span>
          consume <span className="text-emerald-300 px-1">5 credits</span>. You
          can purchase more credits to create more projects.
        </p>
      </div>
    </>
  );
};

export default Pricing;
