import React, { useState, useEffect } from 'react';
import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function CodeEditor(props) {
  const { displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const startState = EditorState.create({
      doc: value,
      extensions: [basicSetup, javascript(), keymap.of([])],
    });

    const view = new EditorView({
      state: startState,
    });

    const updateDoc = (update) => {
      if (update.docChanged) {
        const newValue = update.state.doc.toString();
        onChange(newValue);
      }
    };

    view.behavior(ViewUpdate.createPlugin(updateDoc));

    return () => view.destroy();
  }, [value, onChange]);

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <div className="code-mirror-wrapper" />
    </div>
  );
}
