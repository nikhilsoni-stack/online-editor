import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import './App.css';
import './Sidebar.css';
function Sidebar (prop)
{
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div className="center">
      <label>Input</label>
      <MonacoEditor
        width="500"
        height="300"
        language="javascript"
        theme="vs-dark"
        value={prop.input}
        options={options}
        onChange={prop.onChange}
        
      />
      <lable>Output</lable>
      <MonacoEditor
        width="500"
        height="300"
        language="javascript"
        theme="vs-dark"
        value={prop.result}
        
      />
      </div>
    );
  }

export default Sidebar;
