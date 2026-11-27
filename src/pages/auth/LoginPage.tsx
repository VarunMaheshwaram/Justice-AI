import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { JusticeLogo } from '../../components/common/JusticeLogo';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';
import { Button } from '../../components/ui/button';
import { Input, Label } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'varun.demo@justiceai.in',
      password: 'demo-password',
      rememberMe: true,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const user = await login(values);
    toast.success(`Signed in to Demo Mode as ${user.name}.`);
    navigate(`/${user.role}/dashboard`);
  };

  const handleDemoAccess = async (role: UserRole) => {
    const user = await loginAsDemo(role);
    toast.success(`Entered Demo Mode as ${user.name} (${role}).`);
    navigate(`/${role}/dashboard`);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.info('Demo Mode: Password reset emails are not sent in this frontend-only phase.');
    setForgotOpen(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F8FA] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Login Form */}
        <div className="lg:col-span-7 rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <JusticeLogo />
            <h1 className="text-2xl font-semibold tracking-tight text-[#14243A] pt-2">
              Sign in to JUSTICE AI
            </h1>
            <p className="text-sm text-[#697586]">
              Frontend demonstration authentication — no production credentials are transmitted.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="name@example.in"
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-[#C94D4D]">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-xs font-medium text-[#D9874D] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 rounded border-[#E5E9EF] accent-[#14243A]"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="text-sm text-[#202936]">
                Remember me on this browser (local demo session)
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Login
            </Button>
          </form>

          <p className="text-sm text-[#697586] text-center">
            New to JUSTICE AI?{' '}
            <Link to="/register" className="font-semibold text-[#14243A] hover:text-[#D9874D]">
              Create a demo account
            </Link>
          </p>
        </div>

        {/* Clearly Labelled Demo Mode Access */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[#D9874D]">DEMO MODE ACCESS</p>
              <h2 className="text-lg font-semibold text-[#14243A]">
                Explore Role-Based Workspaces
              </h2>
              <p className="text-xs text-[#697586] leading-relaxed">
                Select any role below to preview JUSTICE AI immediately using pre-loaded fictional
                demonstration data. This is not production authentication.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleDemoAccess('client')}
                className="w-full rounded-lg border border-[#E5E9EF] bg-[#F7F8FA] p-4 text-left hover:border-[#14243A] hover:bg-white transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#14243A]">Continue as Client</span>
                  <ArrowRight className="h-4 w-4 text-[#697586] group-hover:text-[#14243A]" />
                </div>
                <p className="mt-1 text-xs text-[#697586]">
                  Varun Maheshwaram · Cases, Documents, AI Analysis, Assistant & Advocates
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoAccess('advocate')}
                className="w-full rounded-lg border border-[#E5E9EF] bg-[#F7F8FA] p-4 text-left hover:border-[#14243A] hover:bg-white transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#14243A]">Continue as Advocate</span>
                  <ArrowRight className="h-4 w-4 text-[#697586] group-hover:text-[#14243A]" />
                </div>
                <p className="mt-1 text-xs text-[#697586]">
                  Adv. Meera Deshmukh · Profile, Practice Areas, Verification & Enquiries
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoAccess('admin')}
                className="w-full rounded-lg border border-[#E5E9EF] bg-[#F7F8FA] p-4 text-left hover:border-[#14243A] hover:bg-white transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#14243A]">Continue as Admin</span>
                  <ArrowRight className="h-4 w-4 text-[#697586] group-hover:text-[#14243A]" />
                </div>
                <p className="mt-1 text-xs text-[#697586]">
                  Platform Governance · Users, Verifications, Legal Sources & Analytics
                </p>
              </button>
            </div>
          </div>

          <DisclaimerBanner compact />
        </div>
      </div>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password (Demo Mode)</DialogTitle>
            <DialogDescription>
              In production, a secure password reset link will be sent via Supabase Auth / FastAPI.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="reset-email">Account Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.in"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setForgotOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Request Reset</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
