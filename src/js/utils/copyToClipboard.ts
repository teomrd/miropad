import notify from "../components/molecules/notify.ts";

export const copyToClipboard = async (
  what: string,
  message = "📋 Copied to clipboard",
) => {
  try {
    await navigator.clipboard.writeText(what);
    notify.success(message);
  } catch (error) {
    notify.error((error as Error).message);
  }
};
