import { Card, CardContent } from '@/components/ui/card';
import type { Workspace } from '@/types/workspace';
import { formatDate, getInitials } from './helpers';

type MembersSectionProps = {
  workspace: Workspace;
};

export function MembersSection({ workspace }: MembersSectionProps) {
  const members = workspace.members || [];

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm ring-0 transition-all">
      <CardContent className="p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">
            Members
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            People assigned to this workspace.
          </p>
        </div>

        {members.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No members found.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Member</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Seat Status</th>
                    <th className="px-4 py-3 font-semibold">Activated At</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {members.map((member, index) => (
                    <tr key={`${member.user?._id}-${index}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DE5A3F]/10 text-sm font-bold text-[#DE5A3F]">
                            {getInitials(
                              member.user?.name || member.user?.email
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900">
                              {member.user?.name || 'Unnamed User'}
                            </p>

                            <p className="break-all text-xs text-slate-500">
                              {member.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                          {member.role || member.user?.role || 'Member'}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                          {member.seatStatus || 'Active'}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {formatDate(member.activatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}