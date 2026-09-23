'use client';

import { useRef, useState } from 'react';

import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extensions';

import { icon } from '@/components/admin/icons';
import { RichTextVideo } from './RichTextVideo';
import { Select } from '@/components/admin/ui/select';
import MediaPickerDialog from './media-picker/MediaPickerDialog';

import { cn } from '@/lib/utils';

import type { Editor } from '@tiptap/react';
import type { Media } from '@/types/admin';
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

const DEFAULT_TOOLBAR_STATE = {
  block: 'paragraph',
  align: 'left',
  canUndo: false,
  canRedo: false,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrike: false,
  isBlockquote: false,
  isLink: false,
  isBulletList: false,
  isOrderedList: false,
};

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
  const [pickerKind, setPickerKind] = useState<'image' | 'video' | null>(null);
  const selectionRef = useRef<{ from: number; to: number } | null>(null);

  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

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

  // Tiptap v3 doesn't re-render on transactions, and the editor instance is
  // stable (so React Compiler caches isActive() calls) — subscribe explicitly.
  // The snapshot stays null until the first transaction after the editor is
  // created, so fall back to defaults rather than blocking the render.
  const toolbarState =
    useEditorState({
      editor,
      selector: ({ editor: current }) => {
        if (!current) return DEFAULT_TOOLBAR_STATE;

        return {
          block: activeBlockValue(current),
          align: activeAlignValue(current),
          canUndo: current.can().undo(),
          canRedo: current.can().redo(),
          isBold: current.isActive('bold'),
          isItalic: current.isActive('italic'),
          isUnderline: current.isActive('underline'),
          isStrike: current.isActive('strike'),
          isBlockquote: current.isActive('blockquote'),
          isLink: current.isActive('link'),
          isBulletList: current.isActive('bulletList'),
          isOrderedList: current.isActive('orderedList'),
        };
      },
    }) ?? DEFAULT_TOOLBAR_STATE;

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

  function insertMedia(media: Media, kind: 'image' | 'video') {
    if (!media.file_url || !editor) return;

    if (kind === 'image') {
      editor.chain().focus().setImage({ src: media.file_url }).run();
    } else {
      editor.chain().focus().setVideo({ src: media.file_url }).run();
    }
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
          disabled={!toolbarState.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <icon.arrowLeft className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={!toolbarState.canRedo}
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
            value={toolbarState.block}
            onValueChange={setBlock}
          />
        </div>

        <Divider />

        <ToolbarButton
          label="Bold"
          isActive={toolbarState.isBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          isActive={toolbarState.isItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="font-serif italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          isActive={toolbarState.isUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          isActive={toolbarState.isStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <span className="line-through">S</span>
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          isActive={toolbarState.isBlockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <span className="font-serif">&rdquo;</span>
        </ToolbarButton>
        <ToolbarButton
          label="Insert link"
          isActive={toolbarState.isLink}
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
          isActive={toolbarState.isBulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <span className="text-[12px]">&bull;&#8212;</span>
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          isActive={toolbarState.isOrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <span className="text-[12px]">1.</span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Insert image"
          onClick={() => setPickerKind('image')}
        >
          <icon.image className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Insert video"
          onClick={() => setPickerKind('video')}
        >
          <icon.video className="size-4" />
        </ToolbarButton>

        <Divider />

        {ALIGN_OPTIONS.map((option) => (
          <ToolbarButton
            key={option.value}
            label={`Align ${option.label.toLowerCase()}`}
            isActive={toolbarState.align === option.value}
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

      <EditorContent editor={editor} />

      <MediaPickerDialog
        isOpen={pickerKind !== null}
        onClose={() => setPickerKind(null)}
        onSelect={(media) => insertMedia(media, pickerKind ?? 'image')}
        mediaType={pickerKind ?? 'image'}
        title={pickerKind === 'video' ? 'Insert a video' : 'Insert an image'}
      />
    </div>
  );
}
