"use client";
import {
  Brain,
  Briefcase,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DashboardView({ insights }) {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const demandLevelColor = (color) => {
    switch (color) {
      case "HIGH":
        return "bg-green-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutLookInfo = (outlook) => {
    switch (outlook) {
      case "POSITIVE":
        return {
          color: "text-green-500",
          icon: <TrendingUp className="h-4 w-4" />,
        };
      case "NEUTRAL":
        return {
          color: "text-yellow-500",
          icon: <LineChart className="h-4 w-4" />,
        };
      case "NEGATIVE":
        return {
          color: "text-red-500",
          icon: <TrendingDown className="h-4 w-4" />,
        };
      default:
        return {
          color: "bg-gray-500",
          icon: <LineChart className="h-4 w-4" />,
        };
    }
  };
  const OutlookColor = getMarketOutLookInfo(insights.marketOutlook).color;
  const OutlookIcon = getMarketOutLookInfo(insights.marketOutlook).icon;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between`}>
        <Badge variant={"outline"}>Last Updated: {lastUpdatedDate}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className={"flex flex-row justify-between items-center"}>
            <CardTitle>Market Outlook</CardTitle>
            <div className={`h-4 w-4 ${OutlookColor}`}>
              {getMarketOutLookInfo(insights.marketOutlook).icon}
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <span className={`font-bold ${OutlookColor} text-3xl`}>
                {insights.marketOutlook}
              </span>
              <p className="text-muted-foreground text-sm">
                Next update {nextUpdateDistance}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={"flex flex-row justify-between items-center"}>
            <CardTitle>Industry Growth</CardTitle>
            <div className={`h-4 w-4 ${OutlookColor}`}>
              {getMarketOutLookInfo(insights.marketOutlook).icon}
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <span className={`font-bold text-3xl`}>
                {insights.growthRate.toFixed(1)}%
              </span>
              <Progress value={insights.growthRate} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={"flex flex-row justify-between items-center"}>
            <CardTitle>Demand Level</CardTitle>
            <Briefcase className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className={`font-bold text-3xl`}>{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${demandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={"flex flex-row justify-between items-center"}>
            <CardTitle>Top Skills</CardTitle>
            <Brain className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className={`font-bold flex flex-wrap gap-1`}>
              {insights.topSkills.map((skill, index) => (
                <Badge key={index} variant={"secondary"} className="mr-2 mb-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Salary Ranges By Role</CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border p-2 rounded-lg shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm">
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm">
                                {item.name}: {item.value}K
                              </p>
                            ))}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#4B5563" name="Min salary (K)" />
                <Bar dataKey="median" fill="#6B7280" name="Median salary (K)" />
                <Bar dataKey="max" fill="#9CA3AF" name="Max salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>
              Current trends shaping the industry landscape
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="mb-2">
                  <Badge variant="outline" className="mr-2">
                    {trend}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>
              Skills to focus on for career growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {insights.recommendedSkills.map((skill, index) => (
                <li key={index} className="mb-2">
                  <Badge variant="secondary" className="mr-2">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardView;
