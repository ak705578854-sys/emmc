export default function FrontPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b2d5c",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>EMMC</h1>
        <h2>Emergency Medical Management & Care</h2>
        <p>Application is working successfully.</p>

        <button
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
