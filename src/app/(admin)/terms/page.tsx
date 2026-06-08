
export const metadata = {
  title: 'Terms & Conditions | FetchFocus',
  description: 'Terms and conditions for FetchFocus platform',
};

export default function TermsPage() {
  return (
    <div className="">
  

      {/* Content */}
      <main className=" px-0 lg:px-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl  md:text-3xl font-bold text-slate-900 mb-4">Terms & Conditions</h1>
            <p className="text-lg text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-sm max-w-none text-slate-700 space-y-6">
            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing and using the FetchFocus platform (&quot;Platform&quot;), you accept and agree to be bound by and abide by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on FetchFocus&apos;s Platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the Platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                <li>Violate any applicable laws or regulations related to access to or use of the Platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">3. Disclaimer</h2>
              <p>
                The materials on FetchFocus&apos;s Platform are provided on an &apos;as is&apos; basis. FetchFocus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">4. Limitations</h2>
              <p>
                In no event shall FetchFocus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FetchFocus&apos;s Platform, even if FetchFocus or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on FetchFocus&apos;s Platform could include technical, typographical, or photographic errors. FetchFocus does not warrant that any of the materials on its Platform are accurate, complete, or current. FetchFocus may make changes to the materials contained on its Platform at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">6. Links</h2>
              <p>
                FetchFocus has not reviewed all of the sites linked to its Platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by FetchFocus of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">7. Modifications</h2>
              <p>
                FetchFocus may revise these terms of service for its Platform at any time without notice. By using this Platform, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">9. Subscription Fees and Billing</h2>
              <p>
                If you purchase a subscription to the Platform, you agree to pay all fees and charges that you incur. FetchFocus reserves the right to change its fees and billing practices at any time upon notice to you. Continued use of the Platform following such notification constitutes your acceptance of any such changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">10. User Conduct</h2>
              <p>You agree that you will not:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Violate any applicable law or regulation</li>
                <li>Infringe upon or violate any intellectual property rights</li>
                <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate or otherwise offend anyone</li>
                <li>Attempt to gain unauthorized access to the Platform or its related systems or networks</li>
                <li>Transmit any unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable material</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl  font-bold text-slate-900 mb-3">11. Contact Information</h2>
              <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
              <div className="mt-3 text-slate-700">
                <p className="font-medium">FetchFocus Support</p>
                <p>Email: support@marketinghub.com</p>
                <p>Address: 123 Business St, Suite 100, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </main>

    
    </div>
  );
}
