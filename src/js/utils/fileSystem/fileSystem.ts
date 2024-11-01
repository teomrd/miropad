import notify from "../../components/molecules/notify.ts";

const getNewFileHandle = async (title = "no-titled") => {
  const options = {
    suggestedName: `${title}`,
    types: [
      {
        description: "MiroPad text notes",
        accept: {
          "text/plain": [".miropad"],
        },
      },
    ],
  };

  // @ts-ignore as this is an experimental browser feature
  // and may need to change https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker
  const handle = await globalThis.showSaveFilePicker(options);
  return handle;
};

export const writeFile = async (
  fileHandle: FileSystemFileHandle,
  contents: string,
) => {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
};

/**
 * Saves a new file to disk.
 */
export const saveFileAs = async (contents: string, title?: string) => {
  try {
    const fileHandle = await getNewFileHandle(title);
    await writeFile(fileHandle, contents);
  } catch (_e) {
    const msg = "An error occurred trying to save the file.";
    notify.error(msg);
    return;
  }
};

export const saveDataToFile = (() => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.setAttribute("style", "display: none");
  return (
    data: unknown,
    fileName = `MiroPad-${new Date().toISOString()}.json`,
  ) => {
    const json = JSON.stringify(data),
      blob = new Blob([json], { type: "octet/stream" }),
      url = globalThis.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    globalThis.URL.revokeObjectURL(url);
  };
})();
