import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { CASE_CATEGORIES, USER_CASE_ROLES } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/button';
import { Input, Label, Select, Textarea } from '../../components/ui/input';

const caseSchema = z.object({
  title: z.string().min(4, 'Case title must be at least 4 characters.'),
  category: z.string().min(1, 'Select a case category.'),
  caseNumber: z.string().min(2, 'Enter a reference or case number (use DEMO prefix if sample).'),
  courtName: z.string().min(2, 'Enter the court or forum name.'),
  courtLocation: z.string().min(2, 'Enter the city / state of the forum.'),
  userRole: z.enum(['Petitioner / Plaintiff', 'Respondent / Defendant', 'Other Party']),
  opposingParty: z.string().min(2, 'Enter the opposing party name.'),
  description: z.string().min(15, 'Provide a brief description (at least 15 characters).'),
  filingDate: z.string().min(4, 'Select a filing date.'),
  currentStage: z.string().min(2, 'Specify the current stage.'),
  additionalNotes: z.string().optional(),
});

type CaseFormValues = z.infer<typeof caseSchema>;

export const CreateCasePage: React.FC = () => {
  const { caseId } = useParams();
  const { cases, addCase, updateCase } = useAppData();
  const navigate = useNavigate();

  const existingCase = caseId ? cases.find((c) => c.id === caseId) : undefined;
  const isEditing = Boolean(existingCase);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: existingCase
      ? {
          title: existingCase.title,
          category: existingCase.category,
          caseNumber: existingCase.caseNumber,
          courtName: existingCase.courtName,
          courtLocation: existingCase.courtLocation,
          userRole: existingCase.userRole,
          opposingParty: existingCase.opposingParty,
          description: existingCase.description,
          filingDate: existingCase.filingDate,
          currentStage: existingCase.currentStage,
          additionalNotes: existingCase.additionalNotes,
        }
      : {
          category: 'Property Disputes',
          userRole: 'Petitioner / Plaintiff',
          filingDate: new Date().toISOString().slice(0, 10),
          currentStage: 'Initial Document Collection',
        },
  });

  const onSubmit = (values: CaseFormValues) => {
    if (isEditing && existingCase) {
      updateCase(existingCase.id, {
        ...values,
        additionalNotes: values.additionalNotes || '',
      });
      toast.success('Case details updated.');
      navigate(`/client/cases/${existingCase.id}`);
    } else {
      const created = addCase({
        ...values,
        additionalNotes: values.additionalNotes || '',
        status: 'Active',
      });
      toast.success(`Case "${created.title}" created in local demo workspace.`);
      navigate(`/client/cases/${created.id}`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        meta={isEditing ? 'Edit Case Workspace' : 'New Case Workspace · Local Demo State'}
        title={isEditing ? `Edit: ${existingCase?.title}` : 'Create New Case'}
        description="Record structured information about your legal matter. Please use fictional or anonymised details during this frontend demonstration phase."
        actions={
          <Button asChild variant="outline">
            <Link to={isEditing ? `/client/cases/${existingCase?.id}` : '/client/cases'}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        }
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="title">Case Title</Label>
            <Input
              id="title"
              placeholder="e.g., Horizon Residency Flat Possession Delay"
              {...register('title')}
            />
            {errors.title && <p className="text-xs text-[#C94D4D]">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Case Category</Label>
            <Select id="category" {...register('category')}>
              {CASE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            {errors.category && <p className="text-xs text-[#C94D4D]">{errors.category.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="caseNumber">Case Number / Reference</Label>
            <Input id="caseNumber" placeholder="e.g., DEMO-CS/2026/0512" {...register('caseNumber')} />
            {errors.caseNumber && (
              <p className="text-xs text-[#C94D4D]">{errors.caseNumber.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courtName">Court / Forum Name</Label>
            <Input
              id="courtName"
              placeholder="e.g., City Civil Court / State Consumer Commission"
              {...register('courtName')}
            />
            {errors.courtName && (
              <p className="text-xs text-[#C94D4D]">{errors.courtName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="courtLocation">Court Location</Label>
            <Input
              id="courtLocation"
              placeholder="e.g., Hyderabad, Telangana"
              {...register('courtLocation')}
            />
            {errors.courtLocation && (
              <p className="text-xs text-[#C94D4D]">{errors.courtLocation.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="userRole">Your Role in Case</Label>
            <Select id="userRole" {...register('userRole')}>
              {USER_CASE_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="opposingParty">Opposing Party</Label>
            <Input
              id="opposingParty"
              placeholder="e.g., Fictional Developers Pvt. Ltd."
              {...register('opposingParty')}
            />
            {errors.opposingParty && (
              <p className="text-xs text-[#C94D4D]">{errors.opposingParty.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="filingDate">Filing Date</Label>
            <Input id="filingDate" type="date" {...register('filingDate')} />
            {errors.filingDate && (
              <p className="text-xs text-[#C94D4D]">{errors.filingDate.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="currentStage">Current Stage</Label>
            <Input
              id="currentStage"
              placeholder="e.g., Written Statement / Evidence Review"
              {...register('currentStage')}
            />
            {errors.currentStage && (
              <p className="text-xs text-[#C94D4D]">{errors.currentStage.message}</p>
            )}
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="description">Case Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Summarise the key facts, dispute background, and relief sought..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-[#C94D4D]">{errors.description.message}</p>
            )}
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea
              id="additionalNotes"
              rows={3}
              placeholder="Questions for your advocate, missing receipts, or reminders..."
              {...register('additionalNotes')}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#E5E9EF] pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEditing ? `/client/cases/${existingCase?.id}` : '/client/cases')}
          >
            Cancel
          </Button>
          <Button type="submit">{isEditing ? 'Save Changes' : 'Create Case'}</Button>
        </div>
      </form>
    </div>
  );
};
