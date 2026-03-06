// Demo Mode - All Firebase services disabled
// Using local state management instead

export const inventoryService = {
  subscribe: () => () => {},
  add: async () => {},
  update: async () => {},
  delete: async () => {},
};

export const shoppingListService = {
  add: async () => {},
  toggle: async () => {},
  delete: async () => {},
  clearCompleted: async () => {},
};

export const impactService = {
  recordPrevention: async () => {},
};
