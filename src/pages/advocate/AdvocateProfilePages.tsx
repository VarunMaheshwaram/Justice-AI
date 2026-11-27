import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Check } from 'lucide-react';
import { toast } from 'sonner';
import { LANGUAGES, PRACTICE_AREAS } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { Button } from '../../components/ui/button';
import { Input, Label, Textarea } from '../../components/ui/input';
import { formatINR, getInitials } from '../../utils/formatters';

export const AdvocateProfilePage: React.FC = () => {
  const { advocates } = useAppData();
  const profile = advocates[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        meta="Professional Directory Listing · Demo Profile"
        title="My Professional Profile"
        description="Preview how clients view your credentials, practice areas, office address, and indicative consultation fees."
        actions={
          <Button asChild>
            <Link to="/advocate/edit-profile">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        }
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-[#E5E9EF] pb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#14243A] text-lg font-semibold text-white shrink-0">
            {getInitials(profile.name)}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-[#14243A]">{profile.name}</h2>
            <p className="text-xs text-[#697586]">
              {profile.barCouncil} · Enrolment: <span className="font-mono">{profile.enrolmentNumber}</span>
            </p>
            <StatusText status={`Verification: ${profile.verificationStatus} (Demo)`} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#14243A]">Biography</h3>
          <p className="text-sm text-[#202936] leading-relaxed">{profile.biography}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 border-t border-[#E5E9EF] pt-5 text-sm">
          <div>
            <p className="text-xs text-[#697586]">Practice Areas</p>
            <p className="font-medium text-[#14243A] mt-1">{profile.specializations.join(', ')}</p>
          </div>
          <div>
            <p className="text-xs text-[#697586]">Experience & Indicative Fee</p>
            <p className="font-medium text-[#14243A] mt-1 tabular-nums">
              {profile.experienceYears} Years · {formatINR(profile.indicativeFee)} / consult
            </p>
          </div>
          <div>
            <p className="text-xs text-[#697586]">Qualifications</p>
            <p className="font-medium text-[#202936] mt-1">{profile.qualifications.join(', ')}</p>
          </div>
          <div>
            <p className="text-xs text-[#697586]">Languages</p>
            <p className="font-medium text-[#202936] mt-1">{profile.languages.join(', ')}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-[#697586]">Office Address & Contact</p>
            <p className="font-medium text-[#202936] mt-1">{profile.officeAddress}</p>
            <p className="text-xs text-[#697586] mt-1 font-mono">
              {profile.phone} · {profile.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdvocateEditProfilePage: React.FC = () => {
  const { advocates, updateAdvocateProfile } = useAppData();
  const profile = advocates[0];

  const [name, setName] = useState(profile.name);
  const [biography, setBiography] = useState(profile.biography);
  const [experienceYears, setExperienceYears] = useState(String(profile.experienceYears));
  const [qualifications, setQualifications] = useState(profile.qualifications.join(', '));
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [officeAddress, setOfficeAddress] = useState(profile.officeAddress);
  const [indicativeFee, setIndicativeFee] = useState(String(profile.indicativeFee));
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(profile.languages);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdvocateProfile(profile.id, {
      name,
      biography,
      experienceYears: Math.max(0, Number(experienceYears) || 0),
      qualifications: qualifications
        .split(',')
        .map((q) => q.trim())
        .filter(Boolean),
      phone,
      email,
      officeAddress,
      indicativeFee: Math.max(0, Number(indicativeFee) || 0),
      languages: selectedLanguages.length > 0 ? selectedLanguages : ['English'],
      profileCompletion: 98,
    });
    toast.success('Advocate profile saved in local demonstration state.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        meta="Advocate Portal · Profile Editor"
        title="Edit Professional Profile"
        description="Update your biography, experience, qualifications, contact details, office address, indicative fees, and consultation languages."
      />

      <form
        onSubmit={handleSave}
        className="rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="adv-name">Professional Name</Label>
            <Input id="adv-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="adv-bio">Biography</Label>
            <Textarea
              id="adv-bio"
              rows={4}
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-exp">Years of Experience</Label>
            <Input
              id="adv-exp"
              type="number"
              min={0}
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-fee">Indicative Consultation Fee (INR)</Label>
            <Input
              id="adv-fee"
              type="number"
              min={0}
              value={indicativeFee}
              onChange={(e) => setIndicativeFee(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="adv-qual">Qualifications (comma-separated)</Label>
            <Input
              id="adv-qual"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-phone">Contact Phone</Label>
            <Input id="adv-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-email">Contact Email</Label>
            <Input
              id="adv-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="adv-addr">Office Address</Label>
            <Textarea
              id="adv-addr"
              rows={2}
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Consultation Languages</Label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => {
                const active = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'border-[#14243A] bg-[#14243A] text-white'
                        : 'border-[#E5E9EF] bg-white text-[#202936] hover:bg-[#F7F8FA]'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-[#E5E9EF] pt-4">
          <Button asChild variant="outline">
            <Link to="/advocate/profile">Cancel</Link>
          </Button>
          <Button type="submit">Save Profile Changes</Button>
        </div>
      </form>
    </div>
  );
};

export const AdvocatePracticeAreasPage: React.FC = () => {
  const { advocates, updateAdvocateProfile } = useAppData();
  const profile = advocates[0];
  const [selected, setSelected] = useState<string[]>(profile.specializations);

  const toggleArea = (area: string) => {
    setSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleSave = () => {
    if (selected.length === 0) {
      toast.error('Select at least one practice area.');
      return;
    }
    updateAdvocateProfile(profile.id, { specializations: selected });
    toast.success('Practice areas updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        meta="Advocate Portal · Specializations"
        title="Practice Areas"
        description="Select the legal domains in which you accept client enquiries across the JUSTICE AI directory."
      />

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area) => {
            const isSelected = selected.includes(area);
            return (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={`flex items-center justify-between rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#14243A] bg-[#14243A] text-white'
                    : 'border-[#E5E9EF] bg-[#F7F8FA] text-[#202936] hover:bg-white'
                }`}
              >
                <span>{area}</span>
                {isSelected && <Check className="h-4 w-4 text-[#D9874D]" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#E5E9EF] pt-4">
          <p className="text-xs text-[#697586] tabular-nums">
            {selected.length} practice area(s) selected
          </p>
          <Button onClick={handleSave}>Save Practice Areas</Button>
        </div>
      </div>
    </div>
  );
};

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MODES = ['In-person', 'Video Call', 'Phone Call'];

export const AdvocateAvailabilityPage: React.FC = () => {
  const { advocates, updateAdvocateProfile } = useAppData();
  const profile = advocates[0];

  const [days, setDays] = useState<string[]>(profile.availability.days);
  const [hours, setHours] = useState(profile.availability.hours);
  const [modes, setModes] = useState<string[]>(profile.availability.consultationModes);

  const toggleDay = (d: string) =>
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  const toggleMode = (m: string) =>
    setModes((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdvocateProfile(profile.id, {
      availability: { days, hours, consultationModes: modes },
    });
    toast.success('Consultation availability updated.');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        meta="Advocate Portal · Scheduling"
        title="Availability"
        description="Specify your working days, consultation hours, and preferred consultation modes."
      />

      <form onSubmit={handleSave} className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-6">
        <div className="space-y-2">
          <Label>Available Days</Label>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((day) => {
              const active = days.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`rounded-md border px-3.5 py-2 text-xs font-medium cursor-pointer ${
                    active
                      ? 'border-[#14243A] bg-[#14243A] text-white'
                      : 'border-[#E5E9EF] bg-white text-[#202936]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="avail-hours">Consultation Hours</Label>
          <Input
            id="avail-hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g., 10:30 AM – 6:30 PM IST"
          />
        </div>

        <div className="space-y-2">
          <Label>Consultation Modes Offered</Label>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => {
              const active = modes.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMode(m)}
                  className={`rounded-md border px-3.5 py-2 text-xs font-medium cursor-pointer ${
                    active
                      ? 'border-[#D9874D] bg-[#F5E4D6]/50 text-[#14243A]'
                      : 'border-[#E5E9EF] bg-white text-[#697586]'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end border-t border-[#E5E9EF] pt-4">
          <Button type="submit">Save Availability</Button>
        </div>
      </form>
    </div>
  );
};
