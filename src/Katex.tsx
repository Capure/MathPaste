import katex from "katex";
import { useRef, useEffect } from "react";

const Katex = ({ tex }: { tex: string }) => {
  const renderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elem = renderRef.current;
    if (elem) {
      katex.render(tex, elem, { throwOnError: false, displayMode: true });
    }
  }, [tex, renderRef]);

  return (
    <>
      <div ref={renderRef}></div>
    </>
  );
};

export default Katex;
