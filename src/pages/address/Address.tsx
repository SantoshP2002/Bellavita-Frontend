import { useState } from "react";
import { useGetAddress } from "../../api/address/service";
import AddressForm from "../../components/AddressForm";
import type { IAddress } from "../../types";
import { Button } from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";

const Address = () => {
  const { data, isLoading, isError } = useGetAddress();
  const [showForm, setShowForm] = useState(false);

  const addresses = data?.userAddress?.addresses || [];

  return (
    <div className="w-full h-full p-6">
      {isLoading ? (
        <div className="text-center text-gray-600">
          L<LoadingScreen />
        </div>
      ) : isError ? (
        <div className="text-center text-red-600">Error loading addresses</div>
      ) : (
        <div>
          {/* Header with button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">
              📍 Your Addresses
            </h2>
                {addresses.length < 5 && addresses.length !==0 && (
              <Button
                content="ADD ADDRESS"
                pattern="secondary"
                className="!w-fit cus"
                buttonProps={{ onClick: () => setShowForm((prev) => !prev) }}
              />
            )}
          </div>

          {/* Address Form */}
          {(showForm || addresses.length === 0) && (
            <div className="mb-8">
              <AddressForm />
            </div>
          )}

          {/* Address List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr: IAddress) => (
              <div
                key={addr._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 relative"
              >
                <span className="absolute top-3 right-3 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  Address
                </span>
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {addr.firstName} {addr.lastName}
                </h4>
                <p className="text-gray-600">🏡 {addr.address}</p>
                <p className="text-gray-600">📧 {addr.email}</p>
                <p className="text-gray-600">📞 {addr.phoneNumber}</p>
                {addr.altPhoneNumber && (
                  <p className="text-gray-600">☎️ {addr.altPhoneNumber}</p>
                )}
                {addr.landmark && (
                  <p className="text-gray-600">🏷️ {addr.landmark}</p>
                )}
                <p className="text-gray-600">
                  🌆 {addr.city}, {addr.state} - {addr.pinCode}
                </p>
                <p className="text-gray-600">🌍 {addr.country}</p>
              </div>
            ))}
          </div>

          {/* Count */}
          <p className="mt-6 text-center text-indigo-600 font-medium">
            {addresses.length}/5 addresses saved
          </p>
        </div>
      )}
    </div>
  );
};

export default Address;
