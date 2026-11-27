import { LegalKnowledgeItem } from '../types';
import { mockLegalSources } from '../data/mockLegalSources';

export const legalService = {
  async searchLegalSources(query = '', category = 'All'): Promise<LegalKnowledgeItem[]> {
    const q = query.trim().toLowerCase();
    return mockLegalSources.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  },

  async getLegalSourceById(id: string): Promise<LegalKnowledgeItem | undefined> {
    return mockLegalSources.find((item) => item.id === id);
  },
};
