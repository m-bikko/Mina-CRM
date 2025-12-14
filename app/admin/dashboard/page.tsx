"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wallet, TrendingUp, Receipt, ShoppingBag } from "lucide-react";

interface DashboardData {
  balance: number;
  capital: number;
  taxPayable: number;
  salesToday: {
    count: number;
    amount: number;
  };
  inventoryValue: number;
  supplyCost: number;
  salesChart: {
    date: string;
    amount: number;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dashboard?period=${period}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading || !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-muted-foreground">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Период:</span>
          <Select value={period} onValueChange={(value: "week" | "month") => setPeriod(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Баланс</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data.balance || 0).toLocaleString()} ₸
            </div>
            <p className="text-xs text-muted-foreground">
              Текущие деньги в кассе
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Капитал</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data.capital || 0).toLocaleString()} ₸
            </div>
            <p className="text-xs text-muted-foreground">
              Баланс + затраты на закупы
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Налог к уплате</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(data.taxPayable || 0).toLocaleString()} ₸
            </div>
            <p className="text-xs text-muted-foreground">
              Накопительным итогом
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Продажи сегодня</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.salesToday?.count || 0} чек{data.salesToday?.count === 1 ? "" : "ов"}
            </div>
            <p className="text-xs text-muted-foreground">
              На сумму {(data.salesToday?.amount || 0).toLocaleString()} ₸
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>График продаж</CardTitle>
          <CardDescription>
            Динамика продаж за {period === "week" ? "последнюю неделю" : "последний месяц"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesChart || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}.${date.getMonth() + 1}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} ₸`, "Сумма"]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("ru-RU");
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Стоимость товаров на складе</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(data.inventoryValue || 0).toLocaleString()} ₸
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Общая стоимость всех товаров по ценам продажи
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Формула капитала</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Баланс:</span>
              <span className="font-semibold">{(data.balance || 0).toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">+ Затраты на закупы:</span>
              <span className="font-semibold">{(data.supplyCost || 0).toLocaleString()} ₸</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-bold">= Капитал:</span>
              <span className="font-bold text-lg">{(data.capital || 0).toLocaleString()} ₸</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
