import React from "react";

const getTxt = (txt, align = "center", size) => (
  <div
    style={{
      textAlign: align,
      fontSize: size,
      fontWeight: size ? 400 : 300
    }}
  >
    {txt}
  </div>
);

export default {
  getTxt
};
