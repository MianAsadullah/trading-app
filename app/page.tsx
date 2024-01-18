import Image from "next/image";
import nightwind from "nightwind/helper";

import "./globals.css";
import "./next-grid-layout.css";
import "./next-grid-layout2.css";

const isDarkMode =
  ((typeof window !== "undefined" &&
    window.localStorage.getItem("nightwind-mode")) ??
    "dark") === "dark";
if (isDarkMode) {
  nightwind.enable(true);
}

export default function Home() {
  return <></>;
}
