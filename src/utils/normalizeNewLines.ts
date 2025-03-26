const normalizeNewLines = (key: string): string => {
  return key.replace(/\\n/g, "\n");
};

export default normalizeNewLines;
