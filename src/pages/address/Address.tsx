import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { Button } from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import type { IAddress } from "../../types";
import AddressForm from "../../components/AddressForm";
import { useDeleteAddress, useGetAddress } from "../../api/address/service";
import AddressFormModal from "../../components/modal/children/AddressFormModal";
import useQueryParams from "../../hooks/useQueryParams";

const Address = () => {
  const { removeParam, setParams, queryParams } = useQueryParams();
  const { data, isLoading, isError } = useGetAddress();
  const { mutateAsync } = useDeleteAddress();

  const addresses = data?.userAddress?.addresses || [];

  return (
    <div className="w-full h-full p-6">
      <AddressFormModal
        onClose={() => (removeParam("add"), removeParam("edit"))}
        addresses={queryParams.edit ? addresses : undefined}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <div className="text-center text-red-600">Error loading addresses</div>
      ) : (
        <div>
          {/* Header with button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">
              {addresses.length ? "📍 Your Addresses" : "Add address"}
            </h2>
            {addresses.length < 5 && addresses.length !== 0 && (
              <Button
                content="ADD ADDRESS"
                pattern="secondary"
                className="!w-fit"
                buttonProps={{ onClick: () => setParams({ add: "true" }) }}
              />
            )}
          </div>

          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr: IAddress) => (
                <div
                  key={addr._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 relative"
                >
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      content={<CiEdit />}
                      buttonProps={{
                        onClick: () => setParams({ edit: addr._id }),
                      }}
                      className="border border-[green] rounded"
                    />
                    <Button
                      content={<RiDeleteBinLine />}
                      className="border border-[red] rounded"
                      buttonProps={{ onClick: () => mutateAsync(addr._id) }}
                    />
                  </div>
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
          ) : (
            <AddressForm />
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
