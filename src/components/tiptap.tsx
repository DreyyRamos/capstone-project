"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";

const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert rounded-md border min-h-[150px] border-input bg-background p-3 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch gap-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
