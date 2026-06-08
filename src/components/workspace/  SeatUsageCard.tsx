import { Card, CardContent } from '@/components/ui/card';

type SeatUsageCardProps = {
  usedSeats: number;
  seatsLimit: number;
};

export function SeatUsageCard({ usedSeats, seatsLimit }: SeatUsageCardProps) {
  const seatUsagePercent =
    seatsLimit > 0 ? Math.min((usedSeats / seatsLimit) * 100, 100) : 0;

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm ring-0 transition-all">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">
              Seat Usage
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current workspace member usage against allowed seats.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {usedSeats} used of {seatsLimit}
          </div>
        </div>

        <div className="mt-6">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#DE5A3F] transition-all"
              style={{ width: `${seatUsagePercent}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
            <span>{Math.round(seatUsagePercent)}% used</span>
            <span>{Math.max(seatsLimit - usedSeats, 0)} seats remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}