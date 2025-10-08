'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link as LinkIcon 
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your text...",
  disabled = false,
  className = ""
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          applyBoldFormatting()
          break
        case 'i':
          e.preventDefault()
          applyItalicFormatting()
          break
        case 'u':
          e.preventDefault()
          applyUnderlineFormatting()
          break
      }
    }
  }

  // Apply bold formatting using document.execCommand
  const applyBoldFormatting = () => {
    if (disabled) return
    document.execCommand('bold', false)
    handleInput()
  }

  // Apply italic formatting
  const applyItalicFormatting = () => {
    if (disabled) return
    document.execCommand('italic', false)
    handleInput()
  }

  // Apply underline formatting
  const applyUnderlineFormatting = () => {
    if (disabled) return
    document.execCommand('underline', false)
    handleInput()
  }

  // Apply bullet list
  const applyBulletList = () => {
    if (disabled) return
    document.execCommand('insertUnorderedList', false)
    handleInput()
  }

  // Apply numbered list
  const applyNumberedList = () => {
    if (disabled) return
    document.execCommand('insertOrderedList', false)
    handleInput()
  }

  // Apply link
  const applyLink = () => {
    if (disabled) return
    const url = prompt('Enter URL:')
    if (url) {
      document.execCommand('createLink', false, url)
      handleInput()
    }
  }

  const formatButtons = [
    { icon: Bold, action: applyBoldFormatting, title: 'Bold (Ctrl+B)' },
    { icon: Italic, action: applyItalicFormatting, title: 'Italic (Ctrl+I)' },
    { icon: Underline, action: applyUnderlineFormatting, title: 'Underline (Ctrl+U)' },
    { icon: List, action: applyBulletList, title: 'Bullet List' },
    { icon: ListOrdered, action: applyNumberedList, title: 'Numbered List' },
    { icon: LinkIcon, action: applyLink, title: 'Insert Link' },
  ]

  return (
    <div className={`border border-gray-300 rounded-md overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.title}
            className="h-8 w-8 p-0 hover:bg-gray-200"
            disabled={disabled}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
        <div className="ml-auto text-xs text-gray-500 flex items-center">
          WYSIWYG Editor
        </div>
      </div>

      {/* WYSIWYG Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
             min-h-[150px] p-3 focus:outline-none prose prose-sm max-w-none
             ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
             ${!value && !isFocused ? 'text-gray-400' : 'text-gray-900'}
           `}
          style={{
            lineHeight: '1.6',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          suppressContentEditableWarning={true}
        />
        
        {/* Placeholder */}
         {!value && !isFocused && (
           <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
             {placeholder}
           </div>
         )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-1 text-xs text-gray-500 flex justify-between">
        <span>Characters: {value.length}</span>
        <span>Ctrl+B: Bold | Ctrl+I: Italic | Ctrl+U: Underline</span>
      </div>
    </div>
  )
}