// components/ContentDisplay.tsx
import DOMPurify from "dompurify";

type ContentDisplayProps = {
  htmlContent: string;
};

const ContentDisplay = ({ htmlContent }: ContentDisplayProps) => {
  // Sanitize the HTML on the server or client before rendering
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div
      className="prose dark:prose-invert" // prose classes style the html
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default ContentDisplay;
