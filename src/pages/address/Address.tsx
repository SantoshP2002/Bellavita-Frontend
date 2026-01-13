import { Button } from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import type { IAddress } from "../../types";
import AddressForm from "../../components/AddressForm";
import { useGetAddress } from "../../api/address/service";
import AddressFormModal from "../../components/modal/children/AddressFormModal";
import useQueryParams from "../../hooks/useQueryParams";
import AddressCard from "./components/AddressCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyData from "../../components/empty-data/EmptyData";
import { Link } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const { removeParam, setParams, queryParams } = useQueryParams();
  const { data, isLoading, isError } = useGetAddress();

  const addresses: IAddress[] = data?.userAddress?.addresses || [];

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (data?.userAddress?.defaultAddress) {
      setSelectedAddress(data?.userAddress?.defaultAddress);
    }
  }, [data?.userAddress?.defaultAddress]);

  return (
    <div className="max-w-lvw h-full p-6 dark:bg-black">
      <AddressFormModal
        onClose={() => (removeParam("add"), removeParam("edit"))}
        addresses={queryParams.edit ? addresses : undefined}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <div className="text-center text-red-600">
          <EmptyData content="Address Not Found" />
        </div>
      ) : (
        <div className="p-3 dark:bg-black">
          {/* Header with button */}
          <div className="flex justify-between items-center py-2 dark:bg-black">
            <h2 className="text-2xl font-bold dark:text-purple-300">
              {addresses.length ? "Your Addresses" : "Add Address"}
            </h2>
            {addresses.length < 5 && addresses.length !== 0 && (
              <Button
                content="ADD ADDRESS"
                pattern="outline"
                className="w-40! bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
                buttonProps={{ onClick: () => setParams({ add: "true" }) }}
              />
            )}
          </div>

          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addresses.map((address, index) => (
                <AddressCard
                  key={index}
                  address={address}
                  isSelected={selectedAddress === address._id}
                  onSelect={() => setSelectedAddress(address._id)}
                />
              ))}
            </div>
          ) : (
            <AddressForm />
          )}
        </div>
      )}
      {addresses.length > 0 && (
        <div className="flex gap-10 items-center">
          <Button
            content="Checkout"
            pattern="outline"
            className="mt-10 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
            buttonProps={{
              onClick: () => {
                if (!selectedAddress) {
                  toast.error("Please select an address before proceeding!");
                  return;
                }
                navigate("/checkout", {
                  state: {
                    addressId: selectedAddress,
                  },
                });
              },
            }}
          />

          <Link to={"/cart"}>
            <Button
              content="BACK"
              pattern="outline"
              className="w-40! mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
              buttonProps={{ type: "button" }}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Address;
