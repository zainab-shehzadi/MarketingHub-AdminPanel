'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useAuthStore } from '@/store/auth.store';

export default function LoginPage() {
  const router = useRouter();

  const { signin, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('admin@marketinghub.com');
  const [password, setPassword] = useState('Admin@12345');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (!email.trim() || !password.trim()) {
      return;
    }

    const isSuccess = await signin({
      email: email.trim(),
      password,
    });

    if (isSuccess) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600">
          <Lock className="h-6 w-6 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">FetchFocus</h1>
        <p className="text-slate-600">Super Admin Panel</p>
      </div>

      <Card className="border border-border bg-white shadow-lg ring-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-slate-900">Welcome Back</CardTitle>
          <CardDescription className="text-slate-600">
            Sign in to your admin account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="admin@marketinghub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
                disabled={isLoading}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-200 bg-slate-50 pr-10 text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-600 py-6 text-white hover:bg-orange-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}