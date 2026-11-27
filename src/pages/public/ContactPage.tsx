import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { Input, Label, Select, Textarea } from '../../components/ui/input';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  topic: z.string().min(1, 'Please select a topic.'),
  message: z.string().min(15, 'Please provide at least 15 characters describing your inquiry.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: 'Product Feedback' },
  });

  const onSubmit = () => {
    setSubmitted(true);
    toast.success('Your demonstration message has been recorded locally.');
    reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold text-[#D9874D]">Contact JUSTICE AI</p>
        <h1 className="text-3xl font-bold tracking-tight text-[#14243A]">
          Get in touch with our product team.
        </h1>
        <p className="text-sm text-[#697586] leading-relaxed">
          Have questions about the JUSTICE AI platform, advocate directory onboarding, or future
          partnerships? Send us a message below. Please do not submit confidential case documents
          through this general contact form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-10 w-10 text-[#24845D]" />
              <h2 className="text-lg font-semibold text-[#14243A]">Message Received (Demo Mode)</h2>
              <p className="text-sm text-[#697586] max-w-md mx-auto">
                Thank you for contacting JUSTICE AI. In this frontend demonstration phase, contact
                submissions are simulated locally and not transmitted to an external server.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="e.g., Varun Maheshwaram" {...register('fullName')} />
                  {errors.fullName && (
                    <p className="text-xs text-[#C94D4D]">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.in"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-xs text-[#C94D4D]">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="topic">Inquiry Topic</Label>
                <Select id="topic" {...register('topic')}>
                  <option value="Product Feedback">Product Feedback</option>
                  <option value="Advocate Directory Onboarding">Advocate Directory Onboarding</option>
                  <option value="Institutional / Legal Aid Partnership">
                    Institutional / Legal Aid Partnership
                  </option>
                  <option value="Privacy & Security Question">Privacy & Security Question</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your question or feedback..."
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-xs text-[#C94D4D]">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit">Submit Inquiry</Button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-4">
            <h2 className="text-base font-semibold text-[#14243A]">Office & Support Details (Demo)</h2>
            <div className="space-y-3 text-sm text-[#697586]">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 text-[#14243A] shrink-0" />
                <div>
                  <p className="font-medium text-[#202936]">Email</p>
                  <p>support@justiceai.in (Demonstration Contact)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-[#14243A] shrink-0" />
                <div>
                  <p className="font-medium text-[#202936]">Registered Hub</p>
                  <p>Hyderabad & Bengaluru, India (Demonstration Listing)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-[#14243A] shrink-0" />
                <div>
                  <p className="font-medium text-[#202936]">Support Hours</p>
                  <p>Monday – Friday, 9:30 AM – 6:30 PM IST</p>
                </div>
              </div>
            </div>
          </div>
          <DisclaimerBanner />
        </div>
      </div>
    </div>
  );
};
