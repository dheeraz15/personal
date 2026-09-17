import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The default share card, used by any page that does not set its own image.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#333333",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.6 }}>dhirajchapagain.com.np</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, opacity: 0.75, marginTop: 16 }}>
            Product manager in Kathmandu. Essays on people, process and products.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
