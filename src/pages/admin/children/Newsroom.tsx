import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "../../../components/Button";
import LoadingScreen from "../../../components/LoadingScreen";
import EmptyData from "../../../components/empty-data/EmptyData";
import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import type { INewsroom } from "../../../types";
import {
  useDeleteNewsroomById,
  useGetAllNewsroom,
} from "../../../api/newsroom/service";

const Newsroom = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);

  const navigate = useNavigate();

  const deleteNewsroomQuery = useDeleteNewsroomById();
  const { data, isLoading, isError, error } = useGetAllNewsroom();

  const newsroom: INewsroom[] = data?.newsroom || [];

  useEffect(() => {
    document.body.style.overflow = confirmOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [confirmOpen]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8">
        <h3 className="text-2xl font-bold dark:text-white uppercase">
          all newsroom
        </h3>

        <Button
          content="UPLOAD NEWSROOM"
          pattern="secondary"
          className="!w-50"
          icons={{
            right: <AiOutlineCloudUpload className="w-6 h-6" />,
          }}
          buttonProps={{
            onClick: () => navigate("upload"),
          }}
        />
      </div>

      {/* Newsroom List */}
      <div>
        {isLoading && (
          <LoadingScreen content="Newsroom Loading Please Wait !" />
        )}

        {isError && (
          <p className="text-red-500">
            Failed to load newsroom {String(error)}
          </p>
        )}

        {newsroom.length === 0 ? (
          <EmptyData content="No Newsroom Found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsroom.map((item) => (
              <div
                key={item._id}
                className="bg-gray-200 rounded-lg p-4 hover:shadow-sm dark:bg-black"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover rounded-md"
                />

                <h4 className="text-lg font-semibold mt-3 line-clamp-2">
                  {item.title}
                </h4>

                <p>
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                </p>

                <p className="text-sm text-gray-600 mt-1 line-clamp-5">
                  {item.description}
                </p>

                <div className="flex items-center justify-center gap-3 mt-4">
                  <Button
                    content="UPDATE"
                    pattern="outline"
                    className="rounded-lg"
                    buttonProps={{
                      onClick: () =>
                        navigate(`/admin/newsroom/edit/${item._id}`),
                    }}
                  />

                  <Button
                    content="DELETE"
                    pattern="outline"
                    className="rounded-lg"
                    buttonProps={{
                      onClick: () => {
                        setRemoveId(item._id);
                        setConfirmOpen(true);
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete Newsroom"
        message="Are you sure you want to delete this newsroom?"
        onCancel={() => {
          setConfirmOpen(false);
          setRemoveId(null);
        }}
        onConfirm={() => {
          if (removeId) deleteNewsroomQuery.mutate(removeId);
          setConfirmOpen(false);
          setRemoveId(null);
        }}
      />
    </div>
  );
};

export default Newsroom;
