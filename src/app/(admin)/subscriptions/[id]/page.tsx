// import { notFound } from 'next/navigation';
// import { mockSubscriptions } from '@/lib/mock-data';
// import { SubscriptionDetailPage } from '@/components/subscriptions/SubscriptionDetailPage';

// interface SubscriptionDetailRouteProps {
//   params: {
//     id: string;
//   };
// }

// export function generateStaticParams() {
//   return mockSubscriptions.map((subscription) => ({
//     id: subscription.id,
//   }));
// }

// export default function SubscriptionDetailRoute({
//   params,
// }: SubscriptionDetailRouteProps) {
//   const subscription = mockSubscriptions.find(
//     (item) => item.id === params.id
//   );

//   if (!subscription) {
//     notFound();
//   }
// // 
//   return <SubscriptionDetailPage subscription={subscription} />;
// }


"use client";

import { useParams } from "next/navigation";
import { SubscriptionDetailPage } from "@/components/subscriptions/SubscriptionDetailPage";

export default function SubscriptionDetailRoute() {
  const params = useParams();

  const userId = String(params.id || "");

  return <SubscriptionDetailPage userId={userId} />;
}