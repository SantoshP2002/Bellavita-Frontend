import React, { useState, useMemo } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { useCreateReviews } from "../../api/review/service";
import { toast } from "react-toastify";
import type { IReview } from "../../types";

const ProductReview = ({
  reviews: initialReviews = [],
}: {
  reviews: IReview[];
}) => {
  const [reviews, setReviews] = useState<IReview[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    name: "",
    email: "",
    files: [],
  });

  const [files, setFiles] = useState<(File & { preview?: string })[]>([]);

  const { mutate: createReview, isPending } = useCreateReviews();

  // 📊 Calculate stats
  const stats = useMemo(() => {
    const total = reviews.length;

    const average =
      reviews && reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / total
          ).toFixed(1)
        : 0;

    const starCounts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Number(r.rating) === star).length,
    }));

    return { total, average, starCounts };
  }, [reviews]);

  // file change handle
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const withPreview = selectedFiles.map((file) => {
      const extendedFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      return extendedFile;
    });
    setFiles(withPreview);
  };

  // cancel Review handle
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !reviewData.title || !reviewData.description) {
      toast.error("Please fill all required fields!");
      return;
    }
    // formData append

    const formData = new FormData();

    formData.append("rating", String(rating));
    formData.append("title", reviewData.title);
    formData.append("name", reviewData.name);
    formData.append("email", reviewData.email);
    formData.append("description", reviewData.description);

    files.forEach((file) => {
      formData.append("images", file);
    });

    // call mutation
    createReview(formData, {
      onSuccess: (newReview: IReview) => {
        toast.success("Review submitted successfully!");
        setReviews((prev) => [newReview, ...prev]);
        setShowForm(false);
        setRating(0);
        setReviewData({
          title: "",
          description: "",
          name: "",
          email: "",
          files: [],
        });

        setFiles([]);
      },
      onError: (error) => {
        toast.error(typeof error === "string" ? error : "Failed to submit!");
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h2>

      {/* Review Summary Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative pb-6 border-b border-gray-300">
        {/* LEFT */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/4 md:border-r md:border-gray-300 md:pr-10">
          <div className="text-5xl font-bold text-black">{stats.average}</div>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(Number(stats.average)) ? (
                <FaStar key={star} className="text-yellow-400" />
              ) : (
                <FaRegStar key={star} className="text-yellow-400" />
              )
            )}
          </div>
          <div className="text-gray-500 text-sm mt-1">
            {stats.total} Reviews
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex-1 w-full max-w-md md:border-r md:border-gray-300 md:pr-10 md:pl-10">
          {stats.starCounts.map(({ star, count }) => {
            const percentage =
              stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

            return (
              <div
                key={star}
                className="flex items-center gap-3 mb-2 text-sm text-gray-700 justify-center"
              >
                <div className="flex items-center w-14 justify-end">
                  <span>{star}</span>
                  <FaStar className="text-yellow-400 ml-1" />
                </div>

                {/* Rating Bar */}
                <div className="relative w-48 h-3 bg-gray-200 rounded">
                  <div
                    className="absolute left-0 top-0 h-3 bg-yellow-400 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Instead of percentage, show count */}
                <div className="w-16 text-left text-gray-500 text-xs">
                  {count} {count === 1 ? "review" : "reviews"}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/4 flex justify-center md:pl-10">
          <Button
            content={showForm ? "Cancel Review" : "Write  Review"} // ✅ Dynamically change text
            pattern="outline"
            buttonProps={{
              onClick: () => setShowForm((prev) => !prev),
            }}
          />
        </div>
      </div>

      {/* Review Form - Slide Down */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showForm ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border border-gray-200 rounded-lg p-6 mt-6 bg-gray-50">
          <h3 className="text-xl font-bold mb-4 text-center">Write a Review</h3>

          {/* Rating */}
          <div className="flex flex-col items-center mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>

            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  pattern="outline"
                  className="!w-auto !p-2 mx-1 border-none bg-transparent hover:bg-transparent"
                  content={
                    star <= (hover || rating) ? (
                      <FaStar className="text-yellow-400 text-2xl" />
                    ) : (
                      <FaRegStar className="text-yellow-400 text-2xl" />
                    )
                  }
                  buttonProps={{
                    type: "button",
                    onClick: () => setRating(star),
                    onMouseEnter: () => setHover(star),
                    onMouseLeave: () => setHover(0),
                  }}
                />
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div className="">
            <Input
              label="Review"
              inputProps={{
                type: "text",
                placeholder: "Review Title",
                value: reviewData.title,
                onChange: (e) =>
                  setReviewData({ ...reviewData, title: e.target.value }),
              }}
            />

            {/* Description */}
            <textarea
              placeholder="Write your review..."
              value={reviewData.description}
              onChange={(e) =>
                setReviewData({ ...reviewData, description: e.target.value })
              }
              rows={4}
              className="w-full mt-4 border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col items-start mb-6 w-full">
            <label className="text-sm text-gray-600 mb-1">
              Upload Photos (optional)
            </label>

            {/* File input */}
            <Input
              inputProps={{
                type: "file",
                multiple: true,
                accept: "image/*",
                onChange: handleFileChange,
              }}
            />

            {/* Preview Section */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
                {files.map((file, index) => (
                  <div key={index} className="relative border rounded-lg group">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Name & Email */}
          <div className="flex gap-6 mb-4">
            <Input
              label="Name"
              inputProps={{
                type: "text",
                placeholder: "Enter Your Name",
                value: reviewData.name,
                onChange: (e) =>
                  setReviewData({ ...reviewData, name: e.target.value }),
              }}
              className="border-2"
            />
            <Input
              label="Email"
              inputProps={{
                type: "email",
                placeholder: "Enter Your Email",
                value: reviewData.email,
                onChange: (e) =>
                  setReviewData({ ...reviewData, email: e.target.value }),
              }}
              className="border-2"
            />
          </div>

          {/* Buttons cancel and submit */}
          <div className="flex justify-center items-center gap-4">
            <Button
              content="Cancel Review"
              key="button1"
              pattern="outline"
              className="!w-auto"
              buttonProps={{
                onClick: () => setShowForm(false),
              }}
            />

            <Button
              key="button2"
              content={isPending ? "Submitting..." : "Submit Review"}
              pattern="outline"
              className="!w-auto relative overflow-hidden border border-black text-black hover:text-white hover:bg-black transition-all duration-500"
              buttonProps={{
                type: "button",
                onClick: handleSubmit,
                disabled: isPending,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
