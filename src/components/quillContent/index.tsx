import { useEffect, useRef } from "react";

const QuillContent = ({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current && content) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={contentRef}
        className="prose lg:prose-xl max-w-none cursor-default custom-prose"
      />
    </div>
  );
};

export default QuillContent;
