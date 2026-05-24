"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Transaction {
  id: string;
  amount: number;
  createdAt: string;
}

interface DashboardChartsProps {
  transactions: Transaction[];
}

export function DashboardCharts({ transactions }: DashboardChartsProps) {
  // Aggregate transactions by date for the chart
  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];
    
    // Sort oldest to newest
    const sorted = [...transactions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    const aggregated = sorted.reduce((acc, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const existing = acc.find(item => item.date === date);
      
      if (existing) {
        existing.tokens += curr.amount;
      } else {
        acc.push({ date, tokens: curr.amount });
      }
      return acc;
    }, [] as { date: string; tokens: number }[]);

    // Calculate cumulative
    let runningTotal = 0;
    return aggregated.map(item => {
      runningTotal += item.tokens;
      return {
        ...item,
        totalTokens: runningTotal
      };
    });
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground border border-white/5 border-dashed rounded-xl" aria-label="No data available for charts">
        <p>Complete your first extraction to see stats!</p>
      </div>
    );
  }

  return (
    <div 
      className="h-[300px] w-full"
      role="region"
      aria-label="Chart showing tokens claimed over time"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              borderColor: 'rgba(168,85,247,0.3)',
              borderRadius: '12px',
              color: '#fff'
            }}
            itemStyle={{ color: '#a855f7' }}
          />
          <Area 
            type="monotone" 
            dataKey="totalTokens" 
            stroke="#a855f7" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorTokens)" 
            activeDot={{ r: 6, fill: "#06b6d4" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
