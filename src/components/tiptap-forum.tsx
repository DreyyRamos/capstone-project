"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";

const Tiptap = ({
  id,
  name = "description",
  description,
  onChange,
}: {
  id?: string;
  name?: string;
  description: string;
  onChange: (e: {
    target: { name: string | any; value: string | any };
  }) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `
          prose dark:prose-invert max-w-none
          rounded-md border min-h-[150px] border-input bg-background p-3 
          focus:outline-none
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4  
          [&_li]:mb-2 [&_li]:leading-relaxed
          [&_p]:mb-4 [&_p]:leading-relaxed
          [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-2xl [&_h1]:font-bold
          [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-semibold
          [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-medium
          [&_strong]:font-bold [&_b]:font-bold
        `.replace(/\s+/g, " "),
      },
    },
    onUpdate({ editor }) {
      onChange({
        target: { name, value: editor.getHTML() },
      });
    },
  });

  return (
    <div id="tiptap-forum-flex-1" data-testId="tiptap-forum-flex-1" className="flex flex-col justify-stretch gap-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
