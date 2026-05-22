export const GET_STATE_COLOR = (state: string) => {
  switch (state) {
    case "success":
      return "var(--success)";
    case "info":
      return "var(--info)";
    case "error":
      return "var(--error)";
    case "warning":
      return "var(--warning)";
    case "neutral-800":
      return "var(--secondary)";
    case "primary-900":
      return "var(--primary)";
    default:
      return `${state}`;
  }
};
