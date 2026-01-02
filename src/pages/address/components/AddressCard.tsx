import { CiEdit } from "react-icons/ci";
import { Button } from "../../../components/Button";
import { RiDeleteBinLine } from "react-icons/ri";
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
      className={`border ${
        isSelected
          ? "shadow-xl rounded-br-xl bg-gradient-to-br from-pink-100 via-pink-300 to-blue-200 text-white"
          : "border-black shadow-sm hover:shadow-md"
      } rounded-2xl p-5 transition-transform duration-200 hover:scale-[1.02] relative w-full bg-white`}
    >
      <div className="absolute top-3 right-3 flex gap-2">
        <Button
          content={<CiEdit />}
          buttonProps={{
            onClick: () => setParams({ edit: address._id }),
          }}
          className="!p-1.5"
        />
        <Button
          content={<RiDeleteBinLine />}
          buttonProps={{ onClick: () => mutateAsync(address._id) }}
          className="!p-1.5"
        />
      </div>

      {/* Card content */}
      <div className="space-y-1 cursor-grab" onClick={onSelect}>
        <h4 className="font-semibold text-lg text-gray-800 truncate">
          {address.firstName} {address.lastName}
        </h4>
        <p className="text-gray-600 text-sm truncate">🏡 {address.address}</p>
        <p className="text-gray-600 text-sm truncate">📧 {address.email}</p>
        <p className="text-gray-600 text-sm truncate">
          📞 {address.phoneNumber}
        </p>
        {address.altPhoneNumber && (
          <p className="text-gray-600 text-sm truncate">
            ☎️ {address.altPhoneNumber}
          </p>
        )}
        {address.landmark && (
          <p className="text-gray-600 text-sm truncate">
            🏷️ {address.landmark}
          </p>
        )}
        <p className="text-gray-600 text-sm truncate">
          🌆 {address.city}, {address.state} - {address.pinCode}
        </p>
        <p className="text-gray-600 text-sm truncate">🌍 {address.country}</p>
      </div>
    </div>
  );
};

export default AddressCard;
