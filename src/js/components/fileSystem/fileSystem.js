import notify from "../../notify";

export const getNewFileHandle = () => {
  const handle = window.chooseFileSystemEntries({
    type: "saveFile",
    accepts: [
      {
        description: "Text file",
        extensions: ["miropad"],
        mimeTypes: ["text/plain"]
      }
    ]
  });
  return handle;
};

export const writeFile = async (fileHandle, contents) => {
  // Create a writer
  const writer = await fileHandle.createWriter();
  // Write the full length of the contents
  await writer.write(0, contents);
  // Close the file and write the contents to disk
  await writer.close();
};

/**
 * Saves a new file to disk.
 */
export const saveFileAs = async contents => {
  let fileHandle;
  try {
    fileHandle = await getNewFileHandle();
  } catch (ex) {
    if (ex.name === "AbortError") {
      notify.info("File saving aborted");
      return;
    }
    const msg = "An error occurred trying to open the file.";
    console.error(msg, ex);
    notify.error(msg);
    return;
  }
  try {
    await writeFile(fileHandle, contents);
  } catch (ex) {
    const msg = "Unable to save file.";
    console.error(msg, ex);
    notify.error(msg);
  }
};
