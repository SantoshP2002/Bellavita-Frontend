import { Button } from "../../../components/Button";

const FAQ = () => {
  const faqs = [
    {
      q: "How can I place an order?",
      a: "You can place an order by browsing products, adding items to your cart, and completing checkout using a secure payment method.",
    },
    {
      q: "Which payment methods are accepted?",
      a: "We accept credit/debit cards, UPI, net banking, and selected digital wallets depending on your region.",
    },
    {
      q: "Can I cancel or modify my order?",
      a: "Orders can be cancelled or modified before they are shipped. Once shipped, cancellation may not be possible.",
    },
    {
      q: "How do I track my order?",
      a: "After placing an order, you will receive an order ID via email. Use this ID on the Order Tracking page to see live updates.",
    },
    {
      q: "What is your delivery timeline?",
      a: "Delivery usually takes 3–7 business days depending on your location and product availability.",
    },
    {
      q: "Do you offer international shipping?",
      a: "Currently, we only ship within selected regions. International shipping will be available soon.",
    },
    {
      q: "What is your return policy?",
      a: "Products can be returned within 7 days of delivery if unused and in original packaging.",
    },
    {
      q: "How do refunds work?",
      a: "Once a return is approved, refunds are processed within 5–7 business days to the original payment method.",
    },
    {
      q: "Are your beauty products authentic?",
      a: "Yes, all our products are 100% authentic and sourced directly from trusted brands and suppliers.",
    },
    {
      q: "How can I contact customer support?",
      a: "You can reach our support team via the Contact Us page or email us at support@example.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-white">
      {/* HERO */}
      <div className="text-center py-20 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Find answers to common questions about orders, payments, shipping,
          returns, and more.
        </p>

        {/* NEEDLE LINE */}
        <span className="mx-auto mt-6 block h-[2px] w-[90%] lg:w-[80%] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
      </div>

      {/* FAQ CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-24">
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-600 dark:text-gray-100">
                {item.q}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* EXTRA HELP */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            If you couldn’t find the answer you were looking for, our support
            team is always here to help.
          </p>
          <Button
            content=" Contact Support"
            pattern="outline"
            className="rounded-lg w-50! mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
