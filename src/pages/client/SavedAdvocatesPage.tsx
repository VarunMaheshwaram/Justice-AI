import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/ui/button';
import { formatINR, getInitials } from '../../utils/formatters';

export const SavedAdvocatesPage: React.FC = () => {
  const { advocates, savedAdvocateIds, toggleSaveAdvocate } = useAppData();
  const savedList = advocates.filter((a) => savedAdvocateIds.includes(a.id));

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Shortlisted Legal Professionals · Demo Profiles"
        title="Saved Advocates"
        description="Compare your bookmarked advocates and open their profiles when you are ready to send an enquiry."
        actions={
          <Button asChild variant="outline">
            <Link to="/client/advocates">Browse All Advocates</Link>
          </Button>
        }
      />

      {savedList.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved advocates yet"
          description="Bookmark advocates from the Find Advocates directory to compare experience, fees, and locations."
          action={
            <Button asChild>
              <Link to="/client/advocates">Find Advocates</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {savedList.map((adv) => (
            <div
              key={adv.id}
              className="rounded-lg border border-[#E5E9EF] bg-white p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#14243A] text-sm font-semibold text-white">
                      {getInitials(adv.name)}
                    </div>
                    <div>
                      <Link
                        to={`/client/advocates/${adv.id}`}
                        className="text-base font-semibold text-[#14243A] hover:text-[#D9874D]"
                      >
                        {adv.name}
                      </Link>
                      <p className="text-xs text-[#697586]">
                        {adv.city}, {adv.state} · {adv.experienceYears} yrs
                      </p>
                    </div>
                  </div>
                  <StatusText status={`${adv.verificationStatus} (Demo)`} />
                </div>
                <p className="text-xs font-medium text-[#202936]">
                  {adv.specializations.join(' · ')}
                </p>
                <p className="text-xs text-[#697586]">
                  Indicative fee: <strong className="font-mono text-[#14243A]">{formatINR(adv.indicativeFee)}</strong> · Languages: {adv.languages.join(', ')}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-[#E5E9EF] pt-3">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/client/advocates/${adv.id}`}>View Profile & Enquire</Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-[#C94D4D] hover:text-[#C94D4D]"
                  onClick={() => {
                    toggleSaveAdvocate(adv.id);
                    toast.success(`Removed ${adv.name} from shortlist.`);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
