
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart"
import { cn, useAppSelector } from "@/shared/lib"
import { getTransactionTotalBalance, getTransactionTotalExpense, getTransactionTotalIncome } from "../model/transaction.selectors"


const chartConfig = {
  expense: {
    label: "Траты",

  },
  income: {
    label: "Доходы",

  },
} satisfies ChartConfig

export const ChartTransaction = () =>  {

  const total = useAppSelector(getTransactionTotalBalance)
  const income = useAppSelector(getTransactionTotalIncome)
  const expense = useAppSelector(getTransactionTotalExpense)

  
  const chartData = [{ income, expense }]

  return (

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] "
        >
          <RadialBarChart
            
            data={chartData}
            innerRadius={100}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis  tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 0}
                           className={cn(
                                    'flex justify-center text-2xl font-bold',
                                    total > '1' ? 'fill-green-600' : 'fill-red-600',
                                    total === '0.00' && 'fill-foreground'
                                  )}
                          // className="fill-foreground text-2xl font-bold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground"
                        >
                          Баланс
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar

              dataKey="income"
              stackId="a"
              cornerRadius={0}
              // fill="var(--color-chart-5)"
              className="stroke-transparent stroke-2 fill-green-300"
            />
            <RadialBar
              dataKey="expense"
              fill="var(--color-chart-2)"
              stackId="a"
              cornerRadius={0}
              className="stroke-transparent stroke-2 fill-red-300"
            />
          </RadialBarChart>
        </ChartContainer>
  )
}
