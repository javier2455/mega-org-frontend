import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export function DashboardStatCard({
  title,
  value,
  icon,
  iconBg = "from-cyan-500 to-blue-500",
  iconColor = "text-cyan-400/40"
}: DashboardStatCardProps) {
  return (
    <Card className="border-cyan-500/30 bg-slate-800/50 rounded-lg border p-4 relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
      <div className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl ${iconBg}`} />
      <div className={`absolute bottom-2 right-2 ${iconColor}`}>
        {icon}
      </div>
    </Card>
  );
} 