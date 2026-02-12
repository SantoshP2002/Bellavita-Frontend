import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  icon?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
}

const ConfirmModal = ({
  open,
  title = "Confirm Action",
  message,
  icon = "https://cdn3d.iconscout.com/3d/premium/thumb/delete-3d-icon-png-download-4644638.png",
  onCancel,
  onConfirm,
  confirmText = "DELETE",
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-black rounded-xl p-5 w-[90%] max-w-sm shadow-lg dark:shadow-blue-300"
          >
            <div className="flex justify-center mb-3">
              <img src={icon} className="w-16 h-16" />
            </div>

            <h4 className="text-center font-semibold mb-2 dark:text-white">
              {title}
            </h4>

            <p className="text-sm text-center mb-4 dark:text-gray-300">
              {message}
            </p>

            <div className="flex justify-end gap-2">
              <Button
                content="Cancel"
                pattern="outline"
                className="rounded-lg text-gray-700 bg-gradient-to-r from-gray-200 dark:from-gray-900 via-gray-100 dark:via-gray-700 to-gray-300 dark:to-gray-600 hover:from-gray-300 dark:hover:from-gray-600 hover:to-gray-300 dark:hover:to-gray-600 transition-all duration-300"
                buttonProps={{ onClick: onCancel }}
              />

              <Button
                content={confirmText}
                pattern="outline"
                className="rounded-lg bg-gradient-to-r from-purple-300 dark:from-purple-600 via-rose-300 dark:via-rose-600 to-red-200 bg-[length:200%_200%] hover:bg-[position:100%_50%] transition-all duration-300"
                buttonProps={{ onClick: onConfirm }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
