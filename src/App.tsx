import { useState, useEffect } from "react";
import styled from "styled-components";
import Katex from "./Katex";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/theme-twilight";

const example = `x^2 + y^2 = 1 \\\\
y = \\sqrt{1 - x^2}

% Edit this LaTeX to see changes
`;

function App() {
  const getDataFromPathname = () => {
    try {
      return window.location.pathname !== "/"
        ? decodeURI(atob(decodeURI(window.location.pathname.slice(1))))
        : example;
    } catch {
      window.location.pathname = "";
      return example;
    }
  };

  const setDataInPathname = (data: string) => {
    window.history.pushState("", "", encodeURI(btoa(encodeURI(data))));
  };

  const copyLinkToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((e) => {
        console.error(e);
        alert("Couldn't copy to clipboard!");
      });
  };

  const [editorValue, setEditorValue] = useState(getDataFromPathname());

  useEffect(() => {
    setDataInPathname(editorValue);
  }, [editorValue]);

  return (
    <>
      <Main>
        <Editor
          value={editorValue}
          onChange={setEditorValue}
          theme="twilight"
          fontSize={18}
          mode="latex"
        />
        <Math>
          <Katex tex={String.raw`${editorValue}`} />
        </Math>
      </Main>
      <ShareBtn onClick={copyLinkToClipboard}>Share</ShareBtn>
    </>
  );
}

export default App;

const Main = styled.div`
  display: flex;
  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

const Editor = styled(AceEditor)`
  display: flex;
  min-height: 100vh;
  min-width: 50vw;
  @media (max-width: 1280px) {
    min-height: 50vh;
    min-width: 100vw;
  }
`;

const Math = styled.div`
  background-color: #000000;
  color: white;
  font-size: 18px;
  padding: 15px;
  box-sizing: border-box;
  width: 50vw;
  height: 100vh;
  overflow: auto;
  @media (max-width: 1280px) {
    height: 50vh;
    width: 100vw;
  }
  .newline {
    height: 10px;
  }
`;

const ShareBtn = styled.button`
  position: fixed;
  bottom: 30px;
  left: calc(50% - 125px);
  width: 250px;
  height: 50px;
  border-radius: 1000px;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: white;
  background-color: #8c00ff;
  font-family: inherit;
  font-size: 1.4em;
  font-weight: bold;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #6c00c5;
  }
`;
