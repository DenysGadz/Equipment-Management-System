interface NotificationProps {
  message?: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

const colors = {
  success: "#16a34a",
  error: "#dc2626",
  info: "#2563eb",
};

export default function Notification({
  message,
  type = "info",
  onClose,
}: NotificationProps) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
        padding: "12px 16px",
        borderRadius: 8,
        background: "rgba(255,255,255,0.96)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        border: `1px solid ${colors[type]}`,
        color: "#111",
        minWidth: 280,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <strong style={{ color: colors[type] }}>
            {type === "success" && "Успіх"}
            {type === "error" && "Помилка"}
            {type === "info" && "Інформація"}
          </strong>
          <div style={{ marginTop: 4 }}>{message}</div>
        </div>
        {onClose ? (
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#555",
              fontSize: 16,
            }}
            aria-label="Close notification"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}
