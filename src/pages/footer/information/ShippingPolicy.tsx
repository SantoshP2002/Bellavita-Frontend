const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Shipping Policy
        </h1>

        <div>
          <p className="text-xl m-5">
            Purchases are shipped from our warehouse in Gurgaon, Haryana –
            India, by courier. Please allow following number of days from
            receipt of your order.
          </p>
          <p className="text-xl m-5">India Wide – 3 to 7 business days</p>

          <p className="text-xl m-5">
            Order deliveries will be made between 9am – 8pm Monday – Saturday.
            Goods will need to be signed for upon delivery. If you cannot be
            there to sign for your delivery please suggest an alternative i.e. a
            family member, colleague, neighbor, etc.
          </p>

          <p className="text-xl m-5">
            Bella Vita Organic takes no responsibility for goods signed by an
            alternative person.
          </p>

          <p className="text-xl m-5">
            Bella Vita Organic is not responsible for damage after delivery.
          </p>

          <p className="text-xl m-5">
            All claims for shortages or damages must be reported to customer
            service onthe day of delivery. Shipping and handling rates may vary
            based on product, packaging, size, volume, type and other
            considerations. The shipping and handling charges are given at the
            time of check out and consumers will know about this before making
            payments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
