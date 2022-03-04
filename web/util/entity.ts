import { EntitySectionSelection } from '../types/EntitySectionSelection';

export const getCollectionForSelectionType = <T>(
  type: EntitySectionSelection,
  all: T[],
  highlighted?: T[]
): T[] => {
  switch (type) {
    case 'highlighted':
      return Array.isArray(highlighted) ? highlighted : [];
    case 'all':
      return all;
    default:
      return [];
  }
};
