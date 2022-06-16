/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, createContext } from "react";
export const ChatAnchorContext = createContext({});

const ChatAnchor = (props) => {
  const [anchor, setanchor] = useState();
  // const [categories, setCategories] = useState(true);

  return (
    <>
      {console.log({ anchor, setanchor })}
      <ChatAnchorContext.Provider value={{ anchor, setanchor }}>
        {props.children}
      </ChatAnchorContext.Provider>
    </>
  );
};
export default ChatAnchor;
