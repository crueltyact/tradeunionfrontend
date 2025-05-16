import { useEffect } from "react";
import "./AutoResizingTextarea.css";
import React from "react";

const AutoResizingTextarea = React.forwardRef(
  ({ className, value, onChange, placeholder, minRows = 1, maxRows = 10, ...props }, ref) => {
    useEffect(() => {
      const textarea = ref?.current;
      if (!textarea) return;

      const resizeTextarea = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
        const maxHeight = lineHeight * maxRows;

        if (textarea.scrollHeight > maxHeight) {
          textarea.style.height = `${maxHeight}px`;
        }
      };

      resizeTextarea();

      const handleInput = () => resizeTextarea();
      textarea.addEventListener("input", handleInput);

      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }, [minRows, maxRows, ref]);

    return (
      <textarea
        {...props}
        className={className}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={minRows}
        style={{
          resize: "none",
          overflow: "hidden",
          minHeight: `${minRows * 20}px`,
          maxHeight: "300px",
          overflowY: "auto",
          transition: "height 0.2s ease-in-out"
        }}
        required
      />
    );
  }
);

export default AutoResizingTextarea;