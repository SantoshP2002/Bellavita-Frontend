import { Button } from "../../../components/Button";
import type { IAddress } from "../../../types";
import { useDeleteAddress } from "../../../api/address/service";
import useQueryParams from "../../../hooks/useQueryParams";

const AddressCard = ({
  address,
  isSelected,
  onSelect,
}: {
  address: IAddress;
  isSelected?: boolean;
  onSelect: () => void;
}) => {
  const { setParams } = useQueryParams();
  const { mutateAsync } = useDeleteAddress();
  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 ease-out bg-white dark:bg-black border border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]
     ${isSelected ? "ring-2 ring-blue-400 dark:ring-blue-400" : ""}`}
    >
      {/* Card Content */}
      <div className="space-y-1 cursor-pointer" onClick={onSelect}>
        <h4 className="font-semibold text-base sm:text-lg text-black dark:text-white truncate">
          {address.firstName} {address.lastName}
        </h4>

        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          🏡 {address.address}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          📧 {address.email}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          📞 {address.phoneNumber}
        </p>

        {address.altPhoneNumber && (
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            ☎️ {address.altPhoneNumber}
          </p>
        )}

        {address.landmark && (
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            🏷️ {address.landmark}
          </p>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          🌆 {address.city}, {address.state} - {address.pinCode}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          🌍 {address.country}
        </p>
      </div>

      {/* Action Buttons (Bottom) */}
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <Button
          content="EDIT"
          buttonProps={{
            onClick: () => setParams({ edit: address._id }),
          }}
          className="w-40! bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
        />

        <Button
          content="DELETE"
          buttonProps={{ onClick: () => mutateAsync(address._id) }}
          className="w-40! bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
        />
      </div>
    </div>
  );
};

export default AddressCard;
