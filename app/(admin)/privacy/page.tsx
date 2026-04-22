import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Marketing Hub',
  description: 'Privacy policy for Marketing Hub platform',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="">
      {/* Content */}
      <main className=" px-6 ">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-sm max-w-none text-slate-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Introduction</h2>
              <p>
                Marketing Hub (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                <li>Financial and Billing Information: Financial information, such as credit card numbers, that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
                <li>Data From Third Parties: Information received from other sources, such as publicly available databases, joint marketing partners, social media platforms, data analytics providers, and publicly available information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Create and manage your account</li>
                <li>Process your transactions and send related information</li>
                <li>Email regarding your account or order</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
                <li>Generate a personal profile about you for the Site to better understand and serve your needs</li>
                <li>Increase the efficiency and operation of the Site</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Disclosure of Your Information</h2>
              <p>We may share information we have collected about you in certain situations:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>By Law or to Protect Rights: If we believe the release of information is necessary to comply with the law, enforce our policies, or protect ours and others&apos; rights, property, and safety.</li>
                <li>Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                <li>Business Transfers: Your information may be transferred as an asset in connection with a merger, bankruptcy, or similar event.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <div className="mt-3 text-slate-700">
                <p className="font-medium">Marketing Hub Support</p>
                <p>Email: privacy@marketinghub.com</p>
                <p>Address: 123 Business St, Suite 100, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
