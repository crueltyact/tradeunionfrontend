import React, { useState, useEffect, useRef } from "react";
import "./MarkdownEditor.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import AutoResizingTextarea from "../UI/AutoResizingTextarea/AutoResizingTextarea";

const MarkdownEditor = ({ value: initialValue = "", onChange }) => {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  // Вставка синтаксиса (жирный, курсив и т.д.)
const insertSyntax = (prefix, suffix = prefix) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const before = value.slice(0, start);
  const selected = value.slice(start, end);
  const after = value.slice(end);

  let newText;
  let cursorStart, cursorEnd;

  if (selected) {
    newText = before + prefix + selected + suffix + after;
    cursorStart = start + prefix.length;
    cursorEnd = end + prefix.length;
  } else {
    newText = before + prefix + suffix + after;
    cursorStart = cursorEnd = start + prefix.length;
  }

  setValue(newText);
  onChange(newText);

  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(cursorStart, cursorEnd);
  });
};

  // Вставка пустой строки между абзацами
  const insertParagraph = () => {
    const textarea = document.querySelector(".markdown-editor-textarea");
    const start = textarea?.selectionStart || value.length;
    const end = textarea?.selectionEnd || value.length;

    const before = value.slice(0, start);
    const after = value.slice(end);
    const newText = `${before}\n\n${after}`;

    setValue(newText);
    onChange(newText);
  };

  return (
    <div className="markdown-editor">
      <div className="editor-toolbar">
        <button type="button" onClick={() => insertSyntax("**")} title="Жирный">B</button>
        <button type="button" onClick={() => insertSyntax("*")} title="Курсив">I</button>
        <button type="button" onClick={insertParagraph} title="Новый абзац">¶</button>
        <button type="button" onClick={() => insertSyntax("## ", "")} title="Заголовок">H</button>
        <button type="button" onClick={() => insertSyntax("- ", "")} title="Список">•</button>
        <button type="button" onClick={() => insertSyntax("[", "](url)")} title="Ссылка">🔗</button>

        {/* Цвета */}
        <div className="toolbar-colors">
          <span title="Красный" onClick={() => insertSyntax("<span style='color:red'>", "</span>")}>🔴</span>
          <span title="Синий" onClick={() => insertSyntax("<span style='color:#207EEB'>", "</span>")}>🔵</span>
          <span title="Зелёный" onClick={() => insertSyntax("<span style='color:green'>", "</span>")}>🟢</span>
          <span title="Фиолетовый" onClick={() => insertSyntax("<span style='color:purple'>", "</span>")}>🟣</span>
        </div>
      </div>

      <AutoResizingTextarea
        className={"markdown-editor-textarea"}
        value={value}
        onChange={handleChange}
        minRows={2}
        maxRows={10}
        ref={textareaRef}
      />

      <div className="markdown-preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{value}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;