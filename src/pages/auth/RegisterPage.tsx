import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { JusticeLogo } from '../../components/common/JusticeLogo';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { Button } from '../../components/ui/button';
import { Input, Label } from '../../components/ui/input';
import { useAuth } from '../../context/AuthContext';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name.'),
    email: z.string().email('Enter a valid email address.'),
    phone: z
      .string()
      .min(10, 'Enter a valid 10-digit Indian phone number.')
      .max(16, 'Phone number is too long.'),
    accountType: z.enum(['client', 'advocate']),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'client',
    },
  });

  const selectedAccountType = watch('accountType');

  const onSubmit = async (values: RegisterFormValues) => {
    const created = await registerUser({
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      accountType: values.accountType,
    });
    toast.success(`Demo ${created.role} account created for ${created.name}.`);
    navigate(`/${created.role}/dashboard`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F8FA] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <JusticeLogo />
            <h1 className="text-2xl font-semibold tracking-tight text-[#14243A] pt-2">
              Create your JUSTICE AI account
            </h1>
            <p className="text-sm text-[#697586]">
              Frontend demonstration registration — accounts are stored locally in your browser.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label>Account Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: 'client', label: 'Client', desc: 'Manage cases & analyse documents' },
                    { value: 'advocate', label: 'Advocate', desc: 'Manage profile & client enquiries' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue('accountType', opt.value)}
                    className={`rounded-lg border p-3.5 text-left transition-colors cursor-pointer ${
                      selectedAccountType === opt.value
                        ? 'border-[#14243A] bg-[#F7F8FA]'
                        : 'border-[#E5E9EF] bg-white hover:bg-[#F7F8FA]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#14243A]">{opt.label}</p>
                    <p className="text-xs text-[#697586] mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-name">Full Name</Label>
              <Input id="reg-name" placeholder="e.g., Varun Maheshwaram" {...register('fullName')} />
              {errors.fullName && (
                <p className="text-xs text-[#C94D4D]">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email Address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="name@example.in"
                  {...register('email')}
                />
                {errors.email && <p className="text-xs text-[#C94D4D]">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-phone">Phone Number</Label>
                <Input id="reg-phone" placeholder="+91 98480 12345" {...register('phone')} />
                {errors.phone && <p className="text-xs text-[#C94D4D]">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#697586] hover:text-[#14243A] cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#C94D4D]">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-confirm">Confirm Password</Label>
                <Input
                  id="reg-confirm"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-[#C94D4D]">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Create Demo Account
            </Button>
          </form>

          <div className="border-t border-[#E5E9EF] pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#697586]">
            <span>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#14243A] hover:text-[#D9874D]">
                Sign in
              </Link>
            </span>
            <button
              type="button"
              onClick={async () => {
                await loginAsDemo('client');
                navigate('/client/dashboard');
              }}
              className="font-semibold text-[#D9874D] hover:underline cursor-pointer text-left sm:text-right"
            >
              Skip & enter Client Demo Mode →
            </button>
          </div>
        </div>

        <DisclaimerBanner compact />
      </div>
    </div>
  );
};
