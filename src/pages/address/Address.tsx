import { Button } from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import type { IAddress } from "../../types";
import AddressForm from "../../components/AddressForm";
import { useGetAddress } from "../../api/address/service";
import AddressFormModal from "../../components/modal/children/AddressFormModal";
import useQueryParams from "../../hooks/useQueryParams";
import AddressCard from "./components/AddressCard";

const Address = () => {
  const { removeParam, setParams, queryParams } = useQueryParams();
  const { data, isLoading, isError } = useGetAddress();

  const addresses: IAddress[] = data?.userAddress?.addresses || [];

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
              {addresses.map((address, index) => (
                <AddressCard key={index} address={address} />
              ))}
            </div>
          ) : (
            <AddressForm />
          )}
        </div>
      )}
      <Button content="Procced To Pay" pattern="secondary" className="mt-8" />
    </div>
  );
};

export default Address;
