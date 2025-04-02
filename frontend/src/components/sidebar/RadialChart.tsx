"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react"



type Props = {
  completed?: number
  total?: number
}

export function RadialChart({ completed = 0 , total = 0 }: Props) {

  const chartData = [{ month: "", completed: completed, pending: total - completed }]
  const percentage = Math.round(total * 10 / completed)
  
  const chartConfig = {
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig


  return (
    <Card className="flex flex-col border-2 border-white shadow-none bg-[#ededed] dark:bg-slate-800 dark:border-slate-700">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completed vs Pending Tasks</CardTitle>
        <CardDescription>Task completion status.</CardDescription>
      </CardHeader>

      <div className="flex items-center flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="text-2xl font-bold fill-foreground"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="pending"
              fill="hsl(var(--chart-1))"
              stackId="a"
              cornerRadius={5}
              className="stroke-2 stroke-transparent"
            />
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="hsl(var(--chart-2))"
              className="stroke-2 stroke-transparent"
            />

          </RadialBarChart>
        </ChartContainer>
      </div>

      <CardFooter className="flex-col gap-2 text-sm mt-[-80px]">
        <div className="flex items-center gap-2 font-medium leading-none">
        Task completion improved by {percentage}% this month{" "} <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
        Analysis based on tasks completed in the last 30 days.
        </div>
      </CardFooter>
    </Card>
  )
}
