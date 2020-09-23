import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

const NoScript = ({ code }) => {
  return (
    <noscript>
      <img
        alt={code}
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${code}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
};

// Track each page view
const PageView = ({ codes = [] }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("fbq" in window) window.fbq("track", "PageView");

    if ("fbq" in window) {
      console.log(pathname);
    }
  }, [codes, pathname]);

  return null;
};

export const FacebookPixel = ({ pixel = [] }) => {
  const [codes, setCodes] = useState();
  const [init, setInit] = useState();

  // Add the script tag in the head
  useEffect(() => {
    if (codes?.length > 0) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );

      codes.forEach((c) => {
        window.fbq("init", c);
      });

      setInit(true);
    }
  }, [codes, setInit]);

  // Ensure codes is an array regardless of tag type
  useEffect(() => {
    let p = [];
    if (!Array.isArray(pixel)) {
      p = [pixel];
    } else {
      p = [...pixel];
    }

    setCodes(p);
  }, [pixel, setCodes]);

  if (!init) {
    return null;
  }

  return (
    <React.Fragment>
      <Switch>
        <Route>
          <PageView {...{ codes }} />
        </Route>
      </Switch>
      {codes.map((code) => (
        <NoScript key={code} {...{ code }} />
      ))}
    </React.Fragment>
  );
};
