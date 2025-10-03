import { CiEdit } from "react-icons/ci";
import { Button } from "../../../components/Button";
import { RiDeleteBinLine } from "react-icons/ri";
import type { IAddress } from "../../../types";
import { useDeleteAddress } from "../../../api/address/service";
import useQueryParams from "../../../hooks/useQueryParams";

const AddressCard = ({ address }: { address: IAddress }) => {
    const {  setParams, } = useQueryParams();
    const { mutateAsync } = useDeleteAddress();
  return (
    <div
      
      className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 relative"
    >
      <div className="absolute top-3 right-3 flex gap-2">
        <Button
          content={<CiEdit />}
          buttonProps={{
            onClick: () => setParams({ edit: address._id }),
          }}
          className="border border-[green] rounded"
        />
        <Button
          content={<RiDeleteBinLine />}
          className="border border-[red] rounded"
          buttonProps={{ onClick: () => mutateAsync(address._id) }}
        />
      </div>
      <h4 className="font-bold text-lg text-gray-800 mb-2">
        {address.firstName} {address.lastName}
      </h4>
      <p className="text-gray-600">🏡 {address.address}</p>
      <p className="text-gray-600">📧 {address.email}</p>
      <p className="text-gray-600">📞 {address.phoneNumber}</p>
      {address.altPhoneNumber && (
        <p className="text-gray-600">☎️ {address.altPhoneNumber}</p>
      )}
      {address.landmark && <p className="text-gray-600">🏷️ {address.landmark}</p>}
      <p className="text-gray-600">
        🌆 {address.city}, {address.state} - {address.pinCode}
      </p>
      <p className="text-gray-600">🌍 {address.country}</p>
    </div>
  );
}

export default AddressCard
