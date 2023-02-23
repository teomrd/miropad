export const findCurrentLine = (text: string, caretIndex: number): string => {
  const lines = text.split("\n");
  type MyAcc = {
    text: string;
    isFound: boolean;
  };
  const line = lines.reduce(
    (acc: MyAcc, line) => {
      const { isFound } = acc;
      if (isFound) return acc;
      const recon = `${acc.text}${line}\n`;
      const currentLength = recon.length;

      if (caretIndex >= currentLength) {
        return {
          text: recon,
          isFound: false,
        };
      }

      return {
        text: line,
        isFound: true,
      };
    },
    {
      text: "",
      isFound: false,
    }
  );

  return line.text;
};
