import { LeafDocument, RootDocuments, ToggleData } from "@notion/types";

export const makeToggleData = (rootDocuments: RootDocuments): ToggleData => {
  return rootDocuments.reduce(
    (acc: ToggleData, { id, documents }: LeafDocument) => {
      if (documents.length > 0)
        return { ...acc, [id]: false, ...makeToggleData(documents) };
      return { ...acc, [id]: false };
    },
    {},
  );
};

export const updateToggleData = (
  freshToggleData: ToggleData,
  storedToggleData: ToggleData,
): ToggleData => {
  const updatedToggleData: ToggleData = {};
  for (const idStr in freshToggleData) {
    const id = Number(idStr);
    if (storedToggleData.hasOwnProperty(id)) {
      updatedToggleData[id] = storedToggleData[id];
    }
  }
  return updatedToggleData;
};
