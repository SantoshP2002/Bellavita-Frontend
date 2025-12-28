import { Button } from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/TextArea";
import { FaRegThumbsUp } from "react-icons/fa";

const BulkOrder = () => {
  return (
    <div className="">
      <img
        className="w-full"
        src="https://bellavitaorganic.com/cdn/shop/files/1200_X235_0b857eca-9439-47b6-86f5-266721e1f330.jpg?v=1686207597&width=1500"
        alt="Bulk order top image"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Input Part  */}
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="mt-14 text-2xl font-semibold">
            Bulk Order Inquiry / Corporate Gifting Form
          </p>

          <div className="py-10 flex flex-col gap-6">
            <Input
              label="Name"
              className="border border-b-4 border-b-gray-300"
              inputProps={{ placeholder: "Enter Name" }}
            />
            <Input
              label="Email"
              className="border border-b-4 border-b-gray-300"
              inputProps={{ placeholder: "Enter Email" }}
            />
            <Input
              label="Phone"
              className="border border-b-4 border-b-gray-300"
              inputProps={{ placeholder: "Enter Phone" }}
            />
            <Input
              label="Item Name"
              className="border border-b-4 border-b-gray-300"
              inputProps={{ placeholder: "Enter Item Name" }}
            />
            <Input
              label="No of Item"
              className="border border-b-4 border-b-gray-300"
              inputProps={{ placeholder: "Enter No. of Item" }}
            />
            <Textarea
              label="Additional Information (optional)"
              className="border border-b-4 border-b-gray-300"
              textareaProps={{
                placeholder: "Write Additional Information (optional)",
              }}
            />

            <Button
              content={
                <span className="relative z-10 flex items-center gap-2">
                  <FaRegThumbsUp className="transition-all duration-300 group-hover:rotate-12 group-hover:translate-x-1" />
                  SUBMIT
                </span>
              }
              pattern="outline"
              className="
    group
    relative
    mt-10
    w-60!
    overflow-hidden
    rounded
    border-2 border-blue-500
    bg-transparent
    px-6 py-3
    font-semibold
    text-blue-500
    transition-all duration-300
    hover:text-white
    active:scale-95

    before:absolute before:inset-0
    before:-translate-x-full
    before:bg-gradient-to-r
    before:from-blue-500
    before:via-purple-500
    before:to-pink-500
    before:transition-transform
    before:duration-500
    hover:before:translate-x-0

    after:absolute after:inset-0
    after:rounded-xl
    after:opacity-0
    after:shadow-[0_0_40px_10px_rgba(59,130,246,0.6)]
    after:transition-opacity
    after:duration-300
    hover:after:opacity-100
  "
            />
          </div>

          {/* Down Side  */}

          <div>
            <p className="text-xl text-center">
              Gifts are silent expressions of love and appreciation, and what
              better way to express love and appreciation than with the gift of
              skincare and perfume, a thoughtful gesture that shows how much you
              care!
            </p>
            <p className="text-xl mt-8 text-center">
              Bella Vita Organic is here to help you with these gifting needs;
              with our online platform, you can conveniently place a bulk order
              and deliver it to any location you desire. This user-friendly
              ordering form is designed to simplify the bulk ordering process,
              and ensure that you get a seamless and delightful ordering
              experience.
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              Corporate Gifting:
            </p>
            <p className="text-xl mt-8 text-center">
              Our range of high-quality skincare and perfume is ideal for
              corporate gifting. Whether you wish to strengthen relationships
              with your clients or showcase gratitude and reward your
              hard-working employees, our products are a sure way to convey
              appreciation. Make a statement with Bella Vita Organic and create
              memorable moments for your business partners, clients, and
              employees.
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              Party Gifting:
            </p>
            <p className="text-xl mt-8 text-center">
              We at Bella Vita Organic understand the importance of celebration
              and special occasions, whether weddings, memorable occasions, or
              birthdays; Our products work as party favours, return gifts, and
              event giveaways. You can delight your guests with our skincare and
              perfume items that they can cherish and enjoy throughout! Let
              Bella Vita Organic be a part of your joyous moments and make them
              even more special.{" "}
            </p>
            <p className="text-xl mt-8 text-center">
              So, step into the world of Bella Vita Organic and discover the joy
              of gifting with a touch of luxury and care. Trust us to make your
              gifting experience memorable, hassle-free, and special.
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              Why is corporate gifting important for employees?
            </p>
            <p className="text-xl mt-8 text-center">
              Corporate gifting is essential as it showcases appreciation, posts
              morale, and enhances loyalty and employee engagement.{" "}
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              Who needs corporate gifting?
            </p>
            <p className="text-xl mt-8 text-center">
              Corporate gifting benefits employers, organisations, and
              businesses that aim to strengthen relationships, recognize efforts
              and wish to create a positive work environment.
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              What are the benefits of corporate gift items?
            </p>
            <p className="text-xl mt-8 text-center">
              Corporate gifting benefits in various ways, like enhancing the
              brand image, fostering goodwill, and improving the relationship
              between clients and employees.{" "}
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              Can the gift hampers be customised?
            </p>
            <p className="text-xl mt-8 text-center">
              Customising gift hampers to align with specific preferences,
              themes, or branding is possible.
            </p>
            <p className="text-xl mt-8 text-center font-extrabold">
              Terms and Conditions:
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Minimum Order Value:
              </strong>{" "}
              The minimum order value for Bulk orders should be Rs. 25,000.
              Orders less than this amount will not be considered.
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Pricing & Discounts:
              </strong>{" "}
              Depending on the size and value of their purchase, bulk clients
              will be given preferential pricing and discounts. The exact price
              and discount structure will be provided upon request depending on
              the chosen products.The minimum order value for Bulk orders should
              be Rs. 25,000. Orders less than this amount will not be
              considered.
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Order Placement:
              </strong>{" "}
              Customers must submit a formal inquiry through our website to bulk
              purchase. Once we receive your Bulk ordering request, our account
              manager will contact you and assist you in finalising the
              purchase.
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Delivery Period:
              </strong>{" "}
              Once placed, you can expect the order to reach you within seven
              business days. However, consider that several factors, like
              product availability and shipping issues, could impact the
              delivery schedule. Our account manager will communicate the
              changes and delays to you.
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Shipping and Handling:
              </strong>{" "}
              The size, weight of the purchase, and delivery location will be
              considered while deciding the shipping and handling costs.
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Payment Requirements:
              </strong>{" "}
              Bella Vita Organic allows bank transfers, credit cards, and other
              prearranged payment options for large purchases. The order
              confirmation will include payment information; you must make a
              full payment to confirm the order.
            </p>
            <p className="text-xl mt-8 text-center">
              <strong className="text-xl mt-8 text-center font-extrabold">
                Product Availability:
              </strong>{" "}
              Although we try and make sure that every item in our catalogue is
              available for wholesale purchases, there may be times when certain
              SKUs may be out of stock or discontinued; in these circumstances,
              the account manager will get in touch with you and either will
              find an appropriate substitute or will provide a refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
