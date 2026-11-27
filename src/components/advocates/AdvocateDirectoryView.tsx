import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, MapPin, Search, Users } from 'lucide-react';
import { toast } from 'sonner';
import { INDIAN_STATES, LANGUAGES, PRACTICE_AREAS } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { StatusText } from '../common/StatCard';
import { EmptyState } from '../common/EmptyState';
import { Button } from '../ui/button';
import { Input, Select } from '../ui/input';
import { formatINR, getInitials } from '../../utils/formatters';

interface AdvocateDirectoryViewProps {
  basePath: '/find-advocates' | '/client/advocates';
  allowSave?: boolean;
}

export const AdvocateDirectoryView: React.FC<AdvocateDirectoryViewProps> = ({
  basePath,
  allowSave = true,
}) => {
  const { advocates, savedAdvocateIds, toggleSaveAdvocate } = useAppData();

  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [locality, setLocality] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [minExp, setMinExp] = useState('0');
  const [maxFee, setMaxFee] = useState('10000');
  const [language, setLanguage] = useState('All');
  const [verification, setVerification] = useState('All');

  const cities = useMemo(
    () => Array.from(new Set(advocates.map((a) => a.city))).sort(),
    [advocates]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = locality.trim().toLowerCase();
    return advocates.filter((adv) => {
      if (
        q &&
        !adv.name.toLowerCase().includes(q) &&
        !adv.city.toLowerCase().includes(q) &&
        !adv.specializations.some((s) => s.toLowerCase().includes(q))
      ) {
        return false;
      }
      if (city !== 'All' && adv.city !== city) return false;
      if (stateFilter !== 'All' && adv.state !== stateFilter) return false;
      if (loc && !adv.locality.toLowerCase().includes(loc)) return false;
      if (specialization !== 'All' && !adv.specializations.includes(specialization)) return false;
      if (adv.experienceYears < Number(minExp)) return false;
      if (adv.indicativeFee > Number(maxFee)) return false;
      if (language !== 'All' && !adv.languages.includes(language)) return false;
      if (verification !== 'All' && adv.verificationStatus !== verification) return false;
      return true;
    });
  }, [
    advocates,
    city,
    language,
    locality,
    maxFee,
    minExp,
    query,
    specialization,
    stateFilter,
    verification,
  ]);

  const resetFilters = () => {
    setQuery('');
    setCity('All');
    setStateFilter('All');
    setLocality('');
    setSpecialization('All');
    setMinExp('0');
    setMaxFee('10000');
    setLanguage('All');
    setVerification('All');
  };

  return (
    <div className="space-y-6">
      {/* Comprehensive 8-Filter Panel */}
      <div className="rounded-lg border border-[#E5E9EF] bg-white p-5 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-4 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697586]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search advocate name or practice area..."
              className="pl-9"
            />
          </div>
          <div className="md:col-span-3">
            <Select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              aria-label="Filter by specialization"
            >
              <option value="All">All Specializations</option>
              {PRACTICE_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filter by city">
              <option value="All">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              aria-label="Filter by state"
            >
              <option value="All">All States</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 border-t border-[#E5E9EF] pt-3.5">
          <Input
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="Filter locality (e.g., Fort)"
          />
          <Select value={minExp} onChange={(e) => setMinExp(e.target.value)} aria-label="Experience">
            <option value="0">Any Experience</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
            <option value="12">12+ Years</option>
          </Select>
          <Select value={maxFee} onChange={(e) => setMaxFee(e.target.value)} aria-label="Consultation fee">
            <option value="10000">Any Indicative Fee</option>
            <option value="2000">Up to ₹2,000</option>
            <option value="2500">Up to ₹2,500</option>
            <option value="3500">Up to ₹3,500</option>
          </Select>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language">
            <option value="All">All Languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>
          <Select
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            aria-label="Verification status"
          >
            <option value="All">All Demo Statuses</option>
            <option value="Approved">Approved (Demo)</option>
            <option value="Pending Review">Pending Review (Demo)</option>
          </Select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#697586]">
          <span className="tabular-nums">
            Showing {filtered.length} of {advocates.length} fictional demonstration advocate
            profiles
          </span>
          <button
            type="button"
            onClick={resetFilters}
            className="font-semibold text-[#14243A] hover:text-[#D9874D] cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No matching advocates found"
          description="Try broadening your city, practice area, language, or fee filter criteria."
          action={
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((adv) => {
            const isSaved = savedAdvocateIds.includes(adv.id);
            return (
              <article
                key={adv.id}
                className="rounded-lg border border-[#E5E9EF] bg-white p-6 flex flex-col justify-between gap-4 hover:border-[#cfd7e3] transition-colors"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#14243A] text-sm font-semibold text-white">
                        {getInitials(adv.name)}
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`${basePath}/${adv.id}`}
                          className="text-base font-semibold text-[#14243A] hover:text-[#D9874D] block truncate"
                        >
                          {adv.name}
                        </Link>
                        <p className="text-xs text-[#697586] flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {adv.city}, {adv.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-y border-[#E5E9EF] py-2.5">
                    <span className="text-[#697586]">
                      Demo Profile ·{' '}
                      <StatusText status={`${adv.verificationStatus} (Demo)`} />
                    </span>
                    <span className="font-mono font-semibold text-[#14243A] tabular-nums">
                      {formatINR(adv.indicativeFee)} / consult
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="font-medium text-[#14243A]">{adv.specializations.join(' · ')}</p>
                    <p className="text-[#697586] tabular-nums">
                      {adv.experienceYears} years experience · {adv.languages.join(', ')}
                    </p>
                    <p className="text-[#697586] line-clamp-2 leading-relaxed pt-1">
                      {adv.biography}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E5E9EF]">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to={`${basePath}/${adv.id}`}>View Profile</Link>
                  </Button>
                  {allowSave && (
                    <Button
                      size="sm"
                      variant={isSaved ? 'default' : 'outline'}
                      onClick={() => {
                        toggleSaveAdvocate(adv.id);
                        toast.success(
                          isSaved
                            ? `Removed ${adv.name} from saved advocates.`
                            : `Saved ${adv.name} to your shortlist.`
                        );
                      }}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="h-3.5 w-3.5" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-3.5 w-3.5" />
                          Save
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
