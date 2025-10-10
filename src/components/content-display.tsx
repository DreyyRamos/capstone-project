// components/ContentDisplay.tsx
import DOMPurify from "dompurify";

type ContentDisplayProps = {
  htmlContent: string;
  className?: string;
};

const ContentDisplay = ({
  htmlContent,
  className = "",
}: ContentDisplayProps) => {
  // Sanitize the HTML on the server or client before rendering
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div
      className={`rounded-md min-h-[150px] border-input p-2 
          focus:outline-none
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4  
          [&_li]:mb-2 [&_li]:leading-relaxed
          [&_p]:mb-4 [&_p]:leading-relaxed
          [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-2xl [&_h1]:font-bold
          [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-semibold
          [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-medium
          [&_strong]:font-bold [&_b]:font-bold`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default ContentDisplay;