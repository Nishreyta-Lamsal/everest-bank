'use client';

import { useRef, useState } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extensions';

import { icon } from '@/components/admin/icons';
import { RichTextVideo } from './RichTextVideo';
import { Select } from '@/components/admin/ui/select';

import { useUploadMedia } from '@/hooks/api/admin/use-media';

import { cn } from '@/lib/utils';

import type { Editor } from '@tiptap/react';
import type { ReactNode } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

const BLOCK_OPTIONS = [
  { label: 'Normal Text', value: 'paragraph' },
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
];

const ALIGN_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

const IMAGE_TYPES = 'image/png,image/jpeg,image/webp,image/gif';
const VIDEO_TYPES = 'video/mp4,video/webm,video/ogg';

type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  label: string;
  children: ReactNode;
};

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  label,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      // Without this the button steals focus on press and ProseMirror loses
      // the selection, so the command would apply to nothing.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      className={cn(
        'flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-[14px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40',
        isActive && 'bg-slate-100 text-slate-950',
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-black/8" />;
}

function activeBlockValue(editor: Editor) {
  if (editor.isActive('heading', { level: 1 })) return 'h1';
  if (editor.isActive('heading', { level: 2 })) return 'h2';
  if (editor.isActive('heading', { level: 3 })) return 'h3';

  return 'paragraph';
}

function activeAlignValue(editor: Editor) {
  const match = ALIGN_OPTIONS.find((option) =>
    editor.isActive({ textAlign: option.value }),
  );

  return match?.value ?? 'left';
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<{ from: number; to: number } | null>(null);

  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const uploadMedia = useUploadMedia();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false }),
      RichTextVideo,
      Placeholder.configure({ placeholder: placeholder ?? '' }),
    ],
    content: value,
    // Next renders this on the server first; without it React hydration warns.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[360px] w-full px-4 py-3 text-[14px] leading-[1.6] text-neutral-900 outline-none [&_h1]:text-[22px] [&_h1]:font-semibold [&_h2]:text-[18px] [&_h2]:font-semibold [&_h3]:text-[16px] [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-300 [&_blockquote]:pl-3 [&_a]:text-blue-600 [&_a]:underline [&_img]:max-w-full [&_img]:rounded-[6px] [&_video]:max-w-full [&_video]:rounded-[6px] [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:h-0 [&_p.is-editor-empty:first-child]:before:text-slate-400 [&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]',
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });

  if (!editor) {
    return (
      <div
        className={cn(
          'h-[420px] w-full animate-pulse rounded-[8px] bg-slate-100',
          className,
        )}
      />
    );
  }

  function setBlock(next: string) {
    if (!editor) return;

    // Opening the Select popup moves focus out of the editor, so re-apply the
    // range captured on mouse-down before running the command.
    const range = selectionRef.current;
    const chain = range
      ? editor.chain().focus().setTextSelection(range)
      : editor.chain().focus();

    if (next === 'paragraph') {
      chain.setParagraph().run();

      return;
    }

    const level = Number(next.replace('h', '')) as 1 | 2 | 3;

    chain.toggleHeading({ level }).run();
  }

  function openLinkForm() {
    if (!editor) return;

    setLinkUrl(editor.getAttributes('link').href ?? '');
    setIsLinkOpen(true);
  }

  function applyLink() {
    if (!editor) return;

    const href = linkUrl.trim();

    if (href) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href, target: '_blank' })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    setIsLinkOpen(false);
    setLinkUrl('');
  }

  function uploadAndInsert(file: File, kind: 'image' | 'video') {
    uploadMedia.mutate(
      { file },
      {
        onSuccess: (media) => {
          if (!media.file_url || !editor) return;

          if (kind === 'image') {
            editor.chain().focus().setImage({ src: media.file_url }).run();
          } else {
            editor.chain().focus().setVideo({ src: media.file_url }).run();
          }
        },
      },
    );
  }

  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-[8px] border border-black/10 bg-white',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-black/8 px-2 py-2">
        <ToolbarButton
          label="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <icon.arrowLeft className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <icon.arrowRight className="size-4" />
        </ToolbarButton>

        <Divider />

        <div
          className="w-[150px] shrink-0"
          onMouseDownCapture={() => {
            const { from, to } = editor.state.selection;

            selectionRef.current = { from, to };
          }}
        >
          <Select
            variant="default"
            size="small"
            options={BLOCK_OPTIONS}
            value={activeBlockValue(editor)}
            onValueChange={setBlock}
          />
        </div>

        <Divider />

        <ToolbarButton
          label="Bold"
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="font-serif italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          isActive={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          isActive={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <span className="line-through">S</span>
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          isActive={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <span className="font-serif">&rdquo;</span>
        </ToolbarButton>
        <ToolbarButton
          label="Insert link"
          isActive={editor.isActive('link')}
          onClick={openLinkForm}
        >
          <span className="font-mono text-[12px]">&lt;/&gt;</span>
        </ToolbarButton>
        <ToolbarButton
          label="Clear formatting"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <span className="text-[12px]">Tx</span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bullet list"
          isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <span className="text-[12px]">&bull;&#8212;</span>
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          isActive={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <span className="text-[12px]">1.</span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Insert image"
          disabled={uploadMedia.isPending}
          onClick={() => imageInputRef.current?.click()}
        >
          <icon.image className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Insert video"
          disabled={uploadMedia.isPending}
          onClick={() => videoInputRef.current?.click()}
        >
          <icon.video className="size-4" />
        </ToolbarButton>

        <Divider />

        {ALIGN_OPTIONS.map((option) => (
          <ToolbarButton
            key={option.value}
            label={`Align ${option.label.toLowerCase()}`}
            isActive={activeAlignValue(editor) === option.value}
            onClick={() =>
              editor.chain().focus().setTextAlign(option.value).run()
            }
          >
            <span className="flex flex-col gap-[2px]">
              <span className="block h-[1.5px] w-[12px] bg-current" />
              <span
                className={cn(
                  'block h-[1.5px] w-[8px] bg-current',
                  option.value === 'center' && 'mx-auto',
                  option.value === 'right' && 'ml-auto',
                )}
              />
              <span className="block h-[1.5px] w-[12px] bg-current" />
            </span>
          </ToolbarButton>
        ))}
      </div>

      {isLinkOpen && (
        <div className="flex items-center gap-2 border-b border-black/8 bg-slate-50 px-3 py-2">
          <input
            autoFocus
            type="url"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                applyLink();
              }

              if (event.key === 'Escape') setIsLinkOpen(false);
            }}
            className="min-w-0 flex-1 rounded-[6px] border border-black/10 bg-white px-3 py-1.5 text-[13px] outline-none focus:border-blue-400"
          />
          <button
            type="button"
            onClick={applyLink}
            className="shrink-0 cursor-pointer rounded-[6px] bg-slate-950 px-3 py-1.5 text-[13px] text-white"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setIsLinkOpen(false)}
            className="shrink-0 cursor-pointer rounded-[6px] px-3 py-1.5 text-[13px] text-slate-600"
          >
            Cancel
          </button>
        </div>
      )}

      {uploadMedia.isPending && (
        <p className="border-b border-black/8 px-4 py-2 text-[12px] text-slate-500">
          Uploading…
        </p>
      )}

      <EditorContent editor={editor} />

      <input
        ref={imageInputRef}
        type="file"
        accept={IMAGE_TYPES}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) uploadAndInsert(file, 'image');

          event.target.value = '';
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept={VIDEO_TYPES}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) uploadAndInsert(file, 'video');

          event.target.value = '';
        }}
      />
    </div>
  );
}
