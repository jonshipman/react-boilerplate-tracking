import { useEffect, useState } from "react";

export const GoogleGTag = ({ tag = [] }) => {
  const [codes, setCodes] = useState();

  // Add the script tag in the head
  useEffect(() => {
    if (codes?.length > 0) {
      let s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${codes[0]}`;

      let m = document.getElementsByTagName("script")[0];

      m.parentNode.insertBefore(s, m);

      // Add the datalayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());

      // Configure each tag
      codes.forEach((c) => {
        window.gtag("config", c);
      });
    }
  }, [codes]);

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

  return null;
};
