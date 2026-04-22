'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Lock, Users, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Marketing Hub',
    email: 'admin@marketinghub.com',
    timezone: 'UTC',
    emailNotifications: true,
    securityAlerts: true,
    weeklyReports: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log('Settings saved:', settings);
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and platform settings"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        {/* <div className="lg:col-span-1">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Account Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50">
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">Security</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Team Members</span>
            </button>
          </div>
        </div> */}

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Account Information</CardTitle>
              <CardDescription>Update your company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">Company Name</label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="border-slate-200 focus:border-orange-600 focus:ring-orange-600"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">Email Address</label>
                <Input
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  type="email"
                  className="border-slate-200 focus:border-orange-600 focus:ring-orange-600"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">Timezone</label>
                <Select value={settings.timezone} onValueChange={(value) => handleChange('timezone', value)}>
                  <SelectTrigger className="border-slate-200 focus:border-orange-600 focus:ring-orange-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    <SelectItem value="EST">EST (GMT-5)</SelectItem>
                    <SelectItem value="CST">CST (GMT-6)</SelectItem>
                    <SelectItem value="MST">MST (GMT-7)</SelectItem>
                    <SelectItem value="PST">PST (GMT-8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Notifications</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-600">Receive updates about your account</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="w-4 h-4 accent-orange-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Security Alerts</p>
                  <p className="text-sm text-slate-600">Get notified about security events</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.securityAlerts}
                  onChange={(e) => handleChange('securityAlerts', e.target.checked)}
                  className="w-4 h-4 accent-orange-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Weekly Reports</p>
                  <p className="text-sm text-slate-600">Receive weekly platform reports</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.weeklyReports}
                  onChange={(e) => handleChange('weeklyReports', e.target.checked)}
                  className="w-4 h-4 accent-orange-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
