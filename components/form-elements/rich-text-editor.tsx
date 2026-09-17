"use client"

import * as React from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/utils"
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconList,
  IconListNumbers,
  IconClearFormatting,
} from "@tabler/icons-react"
import { FieldError } from "./field-error-text"
import { FieldHelperText } from "./field-helper-text"

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  helperText?: string
  required?: boolean
  label?: string
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-input bg-muted/50 p-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
          editor.isActive("bold") ? "bg-muted text-foreground" : "text-muted-foreground"
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
          editor.isActive("italic") ? "bg-muted text-foreground" : "text-muted-foreground"
        )}
      >
        <IconItalic className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
          editor.isActive("strike") ? "bg-muted text-foreground" : "text-muted-foreground"
        )}
      >
        <IconStrikethrough className="size-4" />
      </button>
      <div className="mx-1 h-4 w-px bg-border" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
          editor.isActive("bulletList") ? "bg-muted text-foreground" : "text-muted-foreground"
        )}
      >
        <IconList className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "flex size-8 items-center justify-center rounded-md hover:bg-muted hover:text-foreground",
          editor.isActive("orderedList") ? "bg-muted text-foreground" : "text-muted-foreground"
        )}
      >
        <IconListNumbers className="size-4" />
      </button>
      <div className="mx-1 h-4 w-px bg-border" />
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <IconClearFormatting className="size-4" />
      </button>
    </div>
  )
}

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
        heading: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none before:h-0",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[150px] focus:outline-none p-3",
      },
    },
  })

  
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

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
          error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
        )}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="bg-transparent" />
      </div>
      <FieldError error={error} />
      {helperText ? <FieldHelperText>{helperText}</FieldHelperText> : null}
    </div>
  )
}
