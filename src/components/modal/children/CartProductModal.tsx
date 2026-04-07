import Modal from "../index";
import CartProducts from "../../../components/CartProducts";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CartProductModal = ({ open, onClose }: Props) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      heading="My Cart"
      className="max-w-6xl h-[80vh] overflow-hidden rounded-3xl bg-white dark:bg-black shadow-3xl"
    >
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="cartModal"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.25 }}
            className="flex h-full min-h-0 flex-col"
          >
            <div className="min-h-0 flex-1 overflow-y-auto bg-white dark:bg-black px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
              <CartProducts onClose={onClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default CartProductModal;
