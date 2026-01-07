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
  inventoryCost: number;
  totalProfit: number;
  salesChart: {
    date: string;
    amount: number;
  }[];
}

// Форматирование числа с округлением до 2 знаков после запятой
const formatMoney = (num: number) => {
  return (Math.round((num || 0) * 100) / 100).toLocaleString();
};

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
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Дашборд</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Период:</span>
          <Select value={period} onValueChange={(value: "week" | "month") => setPeriod(value)}>
            <SelectTrigger className="w-[140px] md:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Баланс</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-lg md:text-2xl font-bold">
              {formatMoney(data.balance)} ₸
            </div>
            <p className="text-xs text-muted-foreground hidden md:block">
              Текущие деньги в кассе
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Капитал</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-lg md:text-2xl font-bold">
              {formatMoney(data.capital)} ₸
            </div>
            <p className="text-xs text-muted-foreground hidden md:block">
              Баланс + себестоимость
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Налог</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-lg md:text-2xl font-bold">
              {formatMoney(data.taxPayable)} ₸
            </div>
            <p className="text-xs text-muted-foreground hidden md:block">
              Накопительным итогом
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Сегодня</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-lg md:text-2xl font-bold">
              {data.salesToday?.count || 0} чек.
            </div>
            <p className="text-xs text-muted-foreground">
              {formatMoney(data.salesToday?.amount || 0)} ₸
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
        <CardContent className="pl-0 pr-2 md:pl-2 md:pr-6">
          <div className="h-[250px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesChart || []} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}.${date.getMonth() + 1}`;
                  }}
                />
                <YAxis
                  width={45}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [`${Number(value || 0).toLocaleString()} ₸`, "Сумма"]}
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
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:gap-4 md:grid-cols-2 mt-4 md:mt-6">
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-base md:text-lg">Стоимость на складе</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold">
              {formatMoney(data.inventoryValue)} ₸
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              По ценам продажи
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-base md:text-lg">Формула капитала</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3 pt-0 md:p-6 md:pt-0">
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Баланс:</span>
              <span className="font-semibold">{formatMoney(data.balance)} ₸</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">+ Себестоимость:</span>
              <span className="font-semibold">{formatMoney(data.inventoryCost)} ₸</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-bold text-sm md:text-base">= Капитал:</span>
              <span className="font-bold text-base md:text-lg">{formatMoney(data.capital)} ₸</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:gap-4 md:grid-cols-2 mt-4 md:mt-6">
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-base md:text-lg">Общая прибыль</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold text-green-600">
              {formatMoney(data.totalProfit)} ₸
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              Выручка минус себестоимость, налоги и комиссии
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-base md:text-lg">Себестоимость на складе</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-2xl md:text-3xl font-bold">
              {formatMoney(data.inventoryCost)} ₸
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              По закупочным ценам (FIFO)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
