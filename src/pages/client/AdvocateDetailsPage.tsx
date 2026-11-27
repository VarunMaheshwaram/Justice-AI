import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Scale,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { Button } from '../../components/ui/button';
import { Input, Label, Select, Textarea } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { formatINR, getInitials } from '../../utils/formatters';

export const AdvocateDetailsPage: React.FC = () => {
  const { advocateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { advocates, cases, savedAdvocateIds, toggleSaveAdvocate, submitEnquiry } = useAppData();

  const isClientContext = location.pathname.startsWith('/client');
  const backPath = isClientContext ? '/client/advocates' : '/find-advocates';

  const advocate = advocates.find((a) => a.id === advocateId);

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [preferredMode, setPreferredMode] = useState<'In-person' | 'Video Call' | 'Phone Call'>(
    'Video Call'
  );

  if (!advocate) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-center space-y-4">
        <h2 className="text-lg font-semibold text-[#14243A]">Advocate Profile Not Found</h2>
        <Button asChild>
          <Link to={backPath}>Back to Directory</Link>
        </Button>
      </div>
    );
  }

  const isSaved = savedAdvocateIds.includes(advocate.id);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please sign in via Demo Mode to send a consultation enquiry.');
      navigate('/login');
      return;
    }
    if (!subject.trim() || message.trim().length < 15) {
      toast.error('Please enter a subject and a message of at least 15 characters.');
      return;
    }
    const chosenCase = cases.find((c) => c.id === selectedCaseId);
    submitEnquiry({
      advocateId: advocate.id,
      advocateName: advocate.name,
      clientId: user.id,
      clientName: user.name,
      clientEmail: user.email,
      caseId: chosenCase?.id,
      caseTitle: chosenCase?.title || 'General Legal Consultation',
      subject: subject.trim(),
      message: message.trim(),
      preferredMode,
    });
    toast.success(`Consultation enquiry sent to ${advocate.name} (demo mode).`);
    setEnquiryOpen(false);
    setSubject('');
    setMessage('');
  };

  return (
    <div className={isClientContext ? 'space-y-6' : 'mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-6'}>
      <PageHeader
        meta={`Fictional Demonstration Advocate Profile · ${advocate.barCouncil}`}
        title={advocate.name}
        description={`${advocate.specializations.join(' · ')} · ${advocate.city}, ${advocate.state}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link to={backPath}>
                <ArrowLeft className="h-4 w-4" />
                Back to Directory
              </Link>
            </Button>
            {isClientContext && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleSaveAdvocate(advocate.id);
                  toast.success(isSaved ? 'Removed from saved advocates.' : 'Advocate saved.');
                }}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Save Advocate
                  </>
                )}
              </Button>
            )}
            <Button size="sm" onClick={() => setEnquiryOpen(true)}>
              <Mail className="h-4 w-4" />
              Send Consultation Enquiry
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Background */}
        <div className="lg:col-span-8 space-y-6">
          <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#14243A] text-lg font-semibold text-white">
                {getInitials(advocate.name)}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#14243A]">{advocate.name}</h2>
                <p className="text-xs text-[#697586] tabular-nums">
                  {advocate.experienceYears} Years Experience · Enrolment: {advocate.enrolmentNumber}
                </p>
                <StatusText status={`Verification: ${advocate.verificationStatus} (Demo Only)`} />
              </div>
            </div>

            <div className="border-t border-[#E5E9EF] pt-4 space-y-2">
              <h3 className="text-sm font-semibold text-[#14243A]">Professional Biography</h3>
              <p className="text-sm text-[#202936] leading-relaxed">{advocate.biography}</p>
            </div>
          </section>

          <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-[#14243A] flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#D9874D]" />
                Education & Qualifications
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#202936]">
                {advocate.education.map((ed) => (
                  <li key={ed}>{ed}</li>
                ))}
                {advocate.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-sm font-semibold text-[#14243A] flex items-center gap-2">
                <Scale className="h-4 w-4 text-[#D9874D]" />
                Practice Areas & Courts
              </h3>
              <p className="text-xs font-medium text-[#697586]">Practice Areas</p>
              <p className="text-sm text-[#202936]">{advocate.specializations.join(', ')}</p>
              <p className="text-xs font-medium text-[#697586] pt-2">Courts & Forums Practiced</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#202936]">
                {advocate.courtsPracticed.map((court) => (
                  <li key={court}>{court}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Contact & Indicative Fee Card */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4 text-sm">
            <h3 className="text-base font-semibold text-[#14243A] border-b border-[#E5E9EF] pb-3">
              Consultation & Office Details
            </h3>
            <div className="flex justify-between">
              <span className="text-[#697586]">Indicative Fee</span>
              <span className="font-mono font-semibold text-[#14243A] tabular-nums">
                {formatINR(advocate.indicativeFee)} / session
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#697586]">Languages</span>
              <span className="font-medium text-[#202936] text-right">
                {advocate.languages.join(', ')}
              </span>
            </div>
            <div className="space-y-1.5 border-t border-[#E5E9EF] pt-3 text-xs text-[#697586]">
              <p className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#14243A] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#202936]">{advocate.availability.hours}</strong>
                  <br />
                  {advocate.availability.days.join(', ')}
                </span>
              </p>
              <p className="flex items-start gap-2 pt-1">
                <MapPin className="h-4 w-4 text-[#14243A] shrink-0 mt-0.5" />
                <span>{advocate.officeAddress}</span>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <Phone className="h-4 w-4 text-[#14243A] shrink-0" />
                <span className="font-mono">{advocate.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#14243A] shrink-0" />
                <span>{advocate.email}</span>
              </p>
            </div>
            <Button className="w-full" onClick={() => setEnquiryOpen(true)}>
              Request Consultation
            </Button>
            <p className="text-[11px] text-[#697586] leading-relaxed">
              Privacy reminder: Sending an enquiry never shares your uploaded case documents
              automatically.
            </p>
          </div>
        </aside>
      </div>

      {/* Enquiry Modal */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Consultation Enquiry to {advocate.name}</DialogTitle>
            <DialogDescription>
              Demonstration enquiry form. Case documents remain private and are not attached
              automatically.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            {isClientContext && cases.length > 0 && (
              <div className="space-y-1.5">
                <Label htmlFor="enq-case">Reference Case (Optional)</Label>
                <Select
                  id="enq-case"
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                  <option value="">General Consultation (No specific case)</option>
                </Select>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="enq-subject">Subject</Label>
              <Input
                id="enq-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Preliminary consultation on possession delay reply"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enq-mode">Preferred Consultation Mode</Label>
              <Select
                id="enq-mode"
                value={preferredMode}
                onChange={(e) =>
                  setPreferredMode(e.target.value as 'In-person' | 'Video Call' | 'Phone Call')
                }
              >
                <option value="Video Call">Video Call</option>
                <option value="In-person">In-person</option>
                <option value="Phone Call">Phone Call</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enq-msg">Message</Label>
              <Textarea
                id="enq-msg"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly outline your legal question without including sensitive personal IDs..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEnquiryOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Enquiry</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
