const RefundReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Refund & Return Policy
        </h1>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow">
          {/* REFUND AND RETURN POLICY */}
          <div>
            <p className="text-center my-5 text-xl font-bold">
              REFUND AND RETURN POLICY
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li className="my-5 text-lg leading-relaxed">
                Bella Vita Organic wishes its customers the best shopping
                experience to enhance their lives. As opened or used products
                cannot be reused or resold, the items cannot be returned to the
                seller once delivered.
              </li>
              <li className="text-lg leading-relaxed">
                Our products contain active natural extracts and ingredients and
                damages due to neglect, improper usage or wrong application will
                not be covered under this Policy. This also does not cover
                repercussions arising out of specific sensitivities towards a
                product/ ingredient and you are advised to do patch tests as
                cautioned in every product.
              </li>
            </ul>
          </div>
          {/* Refund Policy */}
          <div>
            <p className="text-center my-15 text-xl font-bold">Refund Policy</p>
            <ul className="list-disc space-y-2 pl-5">
              <li className="text-lg leading-relaxed">
                Bella Vita Organic is not responsible for any damage after the
                delivery of the products.
              </li>
              <li className="text-lg leading-relaxed">
                An unboxing video is mandatory with the original packaging in
                case of claims on missing items / leakage / breakage or damage /
                incorrect product, which has to be made.
              </li>
              <li className="text-lg leading-relaxed">
                In case of a refund to be claimed, kindly contact our customer
                care on +91-9810154380 or write to us on
                shop@bellavitaorganic.com with the necessary images and videos
                related to your claim with subject line “Refund For ”.
              </li>
              <li className="text-lg leading-relaxed">
                In case of a package being tampered / damaged / defected, kindly
                refuse to accept the package from the delivery partner on the
                spot.
              </li>
              <li className="text-lg leading-relaxed">
                Contact the customer care team on +91-9810154380 if the order is
                marked as delivered and is not received by the customer, within
                3 days of the product being marked delivered. No refunds shall
                be made after this period.
              </li>
              <li className="text-lg leading-relaxed">
                The amount of refund does not include the delivery charge as
                they are non-refundable by delivery partners.
              </li>
              <li className="text-lg leading-relaxed">
                Any cash on delivery refunds shall be initiated to the bank
                account provided by the customer in the above manner within 4-7
                working days.
              </li>
              <li className="text-lg leading-relaxed">
                A claim of refund should be made within 24 hours of order
                delivery with the aforementioned details.
              </li>
              <li className="text-lg leading-relaxed">
                If accepted, your refund may take upto 15 days to be credited
                from the day of refund acceptance by Bella Vita Organic.
              </li>
              <li className="text-lg leading-relaxed">
                Bella Vita Organic will provide all the details with relevant
                screenshots along with the transaction id once the refund is
                initiated.
              </li>
            </ul>
          </div>
          {/* Return Policy */}
          <div>
            <p className="text-center my-15 text-xl font-bold">Return Policy</p>
            <ul className="list-disc space-y-2 pl-5">
              <li className="my-5 text-lg leading-relaxed">
                In extreme cases of damaged product delivery (leakage / broken /
                missing items) due to transit, a refund / exchange can be
                initiated after a thorough verification of the refund policy.
              </li>
              <li className="text-lg leading-relaxed">
                The customer should contact our customer care within 24-48 hours
                in the event they receive a damaged / broken/ leaked product
              </li>
            </ul>
          </div>
          {/* Cancellation Policy  */}
          <div>
            <p className="text-center my-15 text-xl font-bold">
              Cancellation Policy
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li className="text-lg leading-relaxed my-5">
                Cancellation of orders can be processed before their dispatch
                from the warehouses only. A gateway charge of 2.5% shall be
                levied against your order for cancellation.
              </li>
              <li className="text-lg leading-relaxed my-5">
                A refund for paid orders shall be credited to the original
                payment account within 15 days of cancellation acceptance.
              </li>
              <li className="text-lg leading-relaxed">
                Orders cannot be cancelled once shipped from the warehouses and
                an amount of 75 will be deducted once the order is shipped and
                if it is returned back to the seller (prepaid orders).
              </li>
            </ul>
          </div>
          {/* FAQ’s  */}
          <div>
            <p className="text-center my-15 text-xl font-bold">FAQ’s</p>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold">
                  Q1. After acceptance of cancellation/refund how long would it
                  take to receive back my funds?
                </p>
                <ul className="list-disc space-y-2 my-5 pl-5">
                  <li className="my-5 text-lg leading-relaxed text-gray-600">
                    Refunds for paid orders shall be credited to the original
                    payment account within 15 days of cancellation acceptance.
                  </li>
                  <li className="my-5 text-lg leading-relaxed text-gray-600">
                    In case of a COD order, refund shall be issued to the bank
                    account shared with the customer support team by the
                    customer within 4-7 working days of cancellation acceptance.
                  </li>
                  <li className="my-5 text-lg leading-relaxed text-gray-600">
                    Bella Vita Organic will provide all the details with
                    relevant screenshots along with the transaction id once the
                    refund is initiated.
                  </li>
                </ul>
              </div>
              {/* Q2  */}
              <div className="mt-10">
                <p className="text-lg font-semibold">
                  Q.2 Does the policy cover opened/used products?
                </p>
                <ul className="list-disc space-y-2 my-5 pl-5 text-gray-600">
                  <li className="my-5 text-lg leading-relaxed">
                    No, the policy does not cover products which have been
                    opened/used. The policy only covers orders having
                    leakage/broken or missing items.
                  </li>
                </ul>
              </div>

              {/* Q3  */}
              <div className="mt-10">
                <p className="text-lg font-semibold">
                  Q.3 How can I cancel my order in case I placed it by mistake?
                </p>
                <ul className="list-disc space-y-2 my-5 pl-5 text-gray-600">
                  <li className="my-5 text-lg leading-relaxed">
                    For orders placed by mistake, you can always cancel those
                    orders yourself on the checkout order confirmation page
                    within the first few hours, also you can reach out to
                    customer care on +91-9810154380 or write to us on
                    shop@bellavitaorganic.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundReturnPolicy;
