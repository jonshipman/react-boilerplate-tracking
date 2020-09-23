import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

// Track each page view
const PageView = ({ codes = [] }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    codes.forEach((_, index) => {
      if ("ga" in window)
        window.ga(`tracker${index}.send`, "pageview", pathname);
    });

    if ("ga" in window) {
      console.log(pathname);
    }
  }, [codes, pathname]);

  return null;
};

export const GoogleAnalytics = ({ ua = [] }) => {
  const [codes, setCodes] = useState();
  const [init, setInit] = useState();

  // Add the script tag in the head
  useEffect(() => {
    if (codes?.length > 0) {
      let s = document.createElement("script");
      s.async = true;
      s.src = "https://www.google-analytics.com/analytics.js";

      let m = document.getElementsByTagName("script")[0];

      m.parentNode.insertBefore(s, m);

      // Add the ga function
      window.ga =
        window.ga ||
        function () {
          (window.ga.q = window.ga.q || []).push(arguments);
        };
      window.ga.l = +new Date();

      codes.forEach((c, index) => {
        window.ga("create", c, "auto", `tracker${index}`);
      });

      setInit(true);
    }
  }, [codes, setInit]);

  // Ensure codes is an array regardless of tag type
  useEffect(() => {
    let u = [];
    if (!Array.isArray(ua)) {
      u = [ua];
    } else {
      u = [...ua];
    }

    setCodes(u);
  }, [ua, setCodes]);

  if (!init) {
    return null;
  }

  return (
    <Switch>
      <Route>
        <PageView {...{ codes }} />
      </Route>
    </Switch>
  );
};
