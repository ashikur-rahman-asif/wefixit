"use client";

import { cn } from "@/lib/utils";
import {
  IconBold,
  IconClearFormatting,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconList,
  IconListNumbers,
  IconStrikethrough,
  IconUnderline,
  IconLink,
  IconUnlink,
  IconPhoto,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
  IconHighlight,
  IconSubscript,
  IconSuperscript,
  IconQuote,
  IconCode,
  IconX,
} from "@tabler/icons-react";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {
  EditorContent,
  useEditor,
  type Editor,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { FieldError } from "./field-error-text";
import { FieldHelperText } from "./field-helper-text";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  label?: string;
}

const ImageNodeView = ({ node, deleteNode }: NodeViewProps) => {
  return (
    <NodeViewWrapper className="relative inline-block group max-w-full group-hover:opacity-100 transition-all duration-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={node.attrs.src}
        alt={node.attrs.alt}
        className="max-w-full rounded-md shadow-sm block m-0"
      />
      <button
        type="button"
        onClick={deleteNode}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-sm"
        title="Delete image"
      >
        <IconX size={16} stroke={2.5} />
      </button>
    </NodeViewWrapper>
  );
};

const CustomImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      editor.chain().focus().setImage({ src: base64Url }).run();
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-input bg-muted/50 p-1">
      {/* Headings */}
      <div className="flex items-center gap-0.5 mr-1">
        {[1, 2, 3, 4, 5, 6].map((level) => {
          const Icon = [IconH1, IconH2, IconH3, IconH4, IconH5, IconH6][level - 1];
          return (
            <button
              key={level}
              type="button"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                  .run()
              }
              className={cn(
                "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
                editor.isActive("heading", { level })
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Formatting */}
      <div className="flex items-center gap-0.5 mr-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("bold") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconBold className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("italic") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconItalic className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("underline") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconUnderline className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("strike") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconStrikethrough className="size-4" />
        </button>
      </div>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Alignment */}
      <div className="flex items-center gap-0.5 mr-1">
        {[
          { icon: IconAlignLeft, align: "left" },
          { icon: IconAlignCenter, align: "center" },
          { icon: IconAlignRight, align: "right" },
          { icon: IconAlignJustified, align: "justify" },
        ].map(({ icon: Icon, align }) => (
          <button
            key={align}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={cn(
              "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
              editor.isActive({ textAlign: align })
                ? "bg-muted text-foreground"
                : "text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Lists & Blocks */}
      <div className="flex items-center gap-0.5 mr-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("bulletList") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconList className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("orderedList") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconListNumbers className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("blockquote") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconQuote className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("codeBlock") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconCode className="size-4" />
        </button>
      </div>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Extra Formatting */}
      <div className="flex items-center gap-0.5 mr-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("subscript") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconSubscript className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("superscript") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconSuperscript className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("highlight") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconHighlight className="size-4" />
        </button>

        {/* Color Picker */}
        <div className="relative flex items-center justify-center">
          <input
            type="color"
            onChange={handleColorChange}
            value={editor.getAttributes("textStyle").color || "#000000"}
            ref={colorInputRef}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            title="Text Color"
          />
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground pointer-events-none"
          >
            <div
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: editor.getAttributes("textStyle").color || "currentColor" }}
            />
          </button>
        </div>
      </div>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Links & Media */}
      <div className="flex items-center gap-0.5 mr-1">
        <button
          type="button"
          onClick={setLink}
          className={cn(
            "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
            editor.isActive("link") ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          <IconLink className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          <IconUnlink className="size-4" />
        </button>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            <IconPhoto className="size-4" />
          </button>
        </div>
      </div>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Clear Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <IconClearFormatting className="size-4" />
      </button>
    </div>
  );
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required,
  label,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none before:h-0",
      }),
      CustomImage,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight,
      Subscript,
      Superscript,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none min-h-[500px] focus:outline-none p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-transparent shadow-sm transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
          error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500",
        )}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="bg-transparent" />
      </div>
      <FieldError error={error} />
      {helperText ? <FieldHelperText>{helperText}</FieldHelperText> : null}
    </div>
  );
}
