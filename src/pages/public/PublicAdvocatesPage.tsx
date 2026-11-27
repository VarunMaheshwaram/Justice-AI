import React from 'react';
import { AdvocateDirectoryView } from '../../components/advocates/AdvocateDirectoryView';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

export const PublicAdvocatesPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold text-[#D9874D]">
          Advocate Directory · Fictional Demonstration Profiles
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#14243A]">
          Discover suitable advocates across India.
        </h1>
        <p className="text-sm text-[#697586] leading-relaxed">
          Filter by city, state, practice area, experience, language, and indicative consultation
          fee. Profiles shown below are fictional demonstration entries—credential verification
          badges do not represent live Bar Council checks in this frontend-only phase.
        </p>
      </div>

      <AdvocateDirectoryView basePath="/find-advocates" allowSave={false} />
      <DisclaimerBanner />
    </div>
  );
};
