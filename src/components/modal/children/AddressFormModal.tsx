import { useEffect } from "react";

import useQueryParams from "../../../hooks/useQueryParams";
import type { IAddress } from "../../../types";
import Modal from "..";
import AddressForm from "../../AddressForm";

const AddressFormModal = ({
  onClose,
  addresses,
}: {
  onClose: () => void;
  addresses?: IAddress[];
}) => {
  const { queryParams, removeParam } = useQueryParams();

  useEffect(() => {
    removeParam("add");
    removeParam("edit");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      onClose={onClose}
      isOpen={!!queryParams.add || !!queryParams.edit}
      heading={queryParams.edit ? "Update Address" : "Add Address"}
      className="!max-w-3xl"
    >
      <AddressForm addresses={addresses} className="mt-2"/>
    </Modal>
  );
};

export default AddressFormModal;
