import { FaRegThumbsUp } from "react-icons/fa";
import { Button } from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/TextArea";

const ContactUs = () => {
  return (
    <section className="bg-white text-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-2xl text-center">DROP US A LINE</h1>
        <p className="text-lg text-center">
          Have a question or comment? Use the form below to send us a message
          and our team will get back to you ASAP. Or Reach us at +91 9810154380
          (10:00 AM to 7:00 PM, Monday to Sunday)
        </p>
        <p className="text-lg text-center font-medium mt-6">
          For instant resolution, chat with us by clicking on the WhatsApp icon
          below
        </p>
      </div>
      {/* Bottom Part  */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-14 lg:flex-row">
          {/* 70% SECTION – FORM */}
          <div className="w-full lg:w-[70%]">
            <div className="flex flex-col gap-10">
              <p className="text-2xl font-medium">Get in touch</p>

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
                label="Phone Number"
                className="border border-b-4 border-b-gray-300"
                inputProps={{ placeholder: "Enter Phone Number" }}
              />

              <Textarea
                label="Comment"
                className="border border-b-4 border-b-gray-300"
                textareaProps={{
                  placeholder: "Enter Comment",
                }}
              />

              <Button
                content={
                  <span className="relative z-10 flex items-center gap-2">
                    <FaRegThumbsUp className="transition-all duration-300 group-hover:rotate-12 group-hover:translate-x-1" />
                    SEND MESSAGE
                  </span>
                }
                pattern="outline"
                className="group relative mt-10 w-60! overflow-hidden rounded border-2 border-blue-500 bg-transparent px-6 py-3 font-semibold text-blue-500 transition-all duration-300 hover:text-white active:scale-95
            before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:transition-transform before:duration-500 hover:before:translate-x-0
            after:absolute after:inset-0 after:rounded-xl after:opacity-0 after:shadow-[0_0_40px_10px_rgba(59,130,246,0.6)] after:transition-opacity after:duration-300 hover:after:opacity-100"
              />

              <p className="text-lg">
                This site is protected by hCaptcha and the hCaptcha Privacy
                Policy and Terms of Service apply.
              </p>
            </div>
          </div>

          {/* 30% SECTION – TEXT */}
          <div className="w-full lg:w-[30%]">
            <div className="rounded-lg p-4">
              <h3 className="mb-4 text-xl font-medium">Marketed By:</h3>

              <p className="mb-3 text-lg leading-relaxed">
                BellaVita First Floor, Plot 417, Udyog Vihar III Rd, Phase III,
                Udyog Vihar, Sector 20, Gurugram, 122008, Haryana
              </p>
            </div>
            {/* Manufactured By:  */}
            <div className="rounded-lg p-4">
              <h3 className="mb-4 text-xl font-medium">Manufactured By:</h3>

              <p className="mb-3 text-lg leading-relaxed">
                Idam Natural Wellness Pvt. Ltd Ground Floor, Plot 417, Udyog
                Vihar III Rd, Phase III, Udyog Vihar, Sector 20, Gurugram,
                122008, Haryana
              </p>
            </div>
            {/* Email  */}
            <div className="rounded-lg p-4">
              <h3 className="text-xl font-medium">Email</h3>

              <p className="mb-3 text-sm leading-relaxed">
                shop@bellavitaorganic.com
              </p>
            </div>
            {/* Contact Number  */}
            <div className="rounded-lg p-4">
              <h3 className="text-xl font-medium">Contact Number</h3>

              <p className="my-3 text-lg leading-relaxed">
                <strong className="font-medium"> Call:</strong> +91 9810154380
                (Monday-Sunday 9:00 AM - 9:00 PM)
              </p>
              <p className="mt-8 text-lg leading-relaxed">
                <strong className="font-medium"> WhatsApp:</strong> +91
                7899215468 (Monday-Sunday 9:00 AM - 9:00 PM).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
