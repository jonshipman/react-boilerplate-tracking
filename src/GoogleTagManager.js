import React, { useEffect, useState } from "react";

const NoScript = ({ code }) => {
  return (
    <noscript>
      <iframe
        title={code}
        src={`https://www.googletagmanager.com/ns.html?id=${code}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
};

export const GoogleTagManager = ({ tag = [] }) => {
  const [codes, setCodes] = useState();
  const [init, setInit] = useState();

  // Add the script tag in the head
  useEffect(() => {
    if (codes?.length > 0) {
      codes.forEach((c) => {
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l !== "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", c);
      });

      setInit(true);
    }
  }, [codes, setInit]);

  // Ensure codes is an array regardless of tag type
  useEffect(() => {
    let t = [];
    if (!Array.isArray(tag)) {
      t = [tag];
    } else {
      t = [...tag];
    }

    setCodes(t);
  }, [tag, setCodes]);

  if (!init) return null;

  return codes.map((code) => <NoScript key={code} {...{ code }} />);
};
