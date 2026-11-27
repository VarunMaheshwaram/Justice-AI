import { AdvocateEnquiry, AdvocateProfile } from '../types';
import { mockAdvocates, mockEnquiries } from '../data/mockAdvocates';

export interface AdvocateSearchFilters {
  query?: string;
  city?: string;
  state?: string;
  locality?: string;
  specialization?: string;
  minExperience?: number;
  maxFee?: number;
  language?: string;
  verificationStatus?: string;
}

let savedIds = new Set<string>(['adv-001', 'adv-002']);
let localEnquiries: AdvocateEnquiry[] = [...mockEnquiries];

export const advocateService = {
  async searchAdvocates(filters: AdvocateSearchFilters = {}): Promise<AdvocateProfile[]> {
    const q = (filters.query || '').trim().toLowerCase();
    return mockAdvocates.filter((adv) => {
      if (
        q &&
        !adv.name.toLowerCase().includes(q) &&
        !adv.city.toLowerCase().includes(q) &&
        !adv.locality.toLowerCase().includes(q) &&
        !adv.specializations.some((s) => s.toLowerCase().includes(q))
      ) {
        return false;
      }
      if (filters.city && filters.city !== 'All' && adv.city !== filters.city) return false;
      if (filters.state && filters.state !== 'All' && adv.state !== filters.state) return false;
      if (
        filters.locality &&
        !adv.locality.toLowerCase().includes(filters.locality.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.specialization &&
        filters.specialization !== 'All' &&
        !adv.specializations.includes(filters.specialization)
      ) {
        return false;
      }
      if (filters.minExperience && adv.experienceYears < filters.minExperience) return false;
      if (filters.maxFee && adv.indicativeFee > filters.maxFee) return false;
      if (
        filters.language &&
        filters.language !== 'All' &&
        !adv.languages.includes(filters.language)
      ) {
        return false;
      }
      if (
        filters.verificationStatus &&
        filters.verificationStatus !== 'All' &&
        adv.verificationStatus !== filters.verificationStatus
      ) {
        return false;
      }
      return true;
    });
  },

  async getAdvocateById(id: string): Promise<AdvocateProfile | undefined> {
    return mockAdvocates.find((a) => a.id === id);
  },

  async saveAdvocate(advocateId: string): Promise<string[]> {
    if (savedIds.has(advocateId)) {
      savedIds.delete(advocateId);
    } else {
      savedIds.add(advocateId);
    }
    return Array.from(savedIds);
  },

  async submitEnquiry(
    payload: Omit<AdvocateEnquiry, 'id' | 'createdAt' | 'status'>
  ): Promise<AdvocateEnquiry> {
    const enquiry: AdvocateEnquiry = {
      ...payload,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    localEnquiries = [enquiry, ...localEnquiries];
    return enquiry;
  },
};
