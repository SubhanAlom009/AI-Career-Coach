"use client";

import { format } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore || 0,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);
  return (
    <Card className={"w-full mx-auto my-8"}>
      <CardHeader>
        <CardTitle className={"gradient-title text-3xl mb:text-4xl"}>
          Performance Trend
        </CardTitle>
        <CardDescription>Your Quiz Score over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background border p-2 rounded-lg shadow-md">
                        <p className="text-sm font-medium">Score: {payload[0].value}%</p>
                        <p className="text-xs text-muted-foreground">{payload[0].payload.date}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#f2f2f2"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default PerformanceChart;
