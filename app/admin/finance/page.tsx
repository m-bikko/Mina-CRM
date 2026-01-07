"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Plus, Minus, Eye } from "lucide-react";

interface Transaction {
  _id: string;
  type: "INCOME" | "EXPENSE";
  category: "SALE" | "SUPPLY" | "MANUAL_ADJUSTMENT" | "WRITE_OFF";
  amount: number;
  reason: string;
  date: string;
}

export default function FinancePage() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [adjustmentType, setAdjustmentType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [amount, setAmount] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/finance/history");
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data.transactions);
        setBalance(data.data.balance);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const createAdjustment = async () => {
    if (!amount || !reason) {
      alert("Заполните все поля");
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum <= 0) {
      alert("Сумма должна быть больше 0");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/finance/adjustment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: adjustmentType,
          amount: amountNum,
          reason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Операция выполнена успешно!");
        setAmount("");
        setReason("");
        setIsDialogOpen(false);
        fetchTransactions();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      alert("Ошибка при выполнении операции");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      SALE: "Продажа",
      SUPPLY: "Завоз",
      MANUAL_ADJUSTMENT: "Ручная корректировка",
      WRITE_OFF: "Списание",
    };
    return labels[category] || category;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Финансы</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardDescription>Текущий баланс</CardDescription>
            <CardTitle className="text-3xl">
              {(balance || 0).toLocaleString()} ₸
            </CardTitle>
          </CardHeader>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-green-50 transition-colors border-green-200">
              <CardHeader>
                <CardDescription>Действия с балансом</CardDescription>
                <div className="flex items-center gap-2">
                  <Plus className="h-6 w-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">
                    Пополнить / Снять
                  </span>
                </div>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Корректировка баланса</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Тип операции</Label>
                <Select
                  value={adjustmentType}
                  onValueChange={(value: "INCOME" | "EXPENSE") =>
                    setAdjustmentType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INCOME">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-green-600" />
                        Пополнение
                      </div>
                    </SelectItem>
                    <SelectItem value="EXPENSE">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-red-600" />
                        Расход
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Сумма</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  min="0.01"
                  step="0.01"
                />
              </div>

              <div>
                <Label>Обоснование</Label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Например: Оплата аренды"
                />
              </div>

              <Button
                onClick={createAdjustment}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Выполнение..." : "Выполнить операцию"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>История транзакций</CardTitle>
          <CardDescription>
            Все движения денежных средств
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Обоснование</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Нет транзакций
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedTransaction(transaction)}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "INCOME" ? (
                          <ArrowUpCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={
                            transaction.type === "INCOME"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {transaction.type === "INCOME" ? "Доход" : "Расход"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryLabel(transaction.category)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {transaction.reason}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      <span
                        className={
                          transaction.type === "INCOME"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.type === "INCOME" ? "+" : "-"}
                        {(transaction.amount || 0).toLocaleString()} ₸
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedTransaction(transaction); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Детали транзакции */}
      <Dialog open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Детали транзакции</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-4">
                {selectedTransaction.type === "INCOME" ? (
                  <ArrowUpCircle className="h-16 w-16 text-green-600" />
                ) : (
                  <ArrowDownCircle className="h-16 w-16 text-red-600" />
                )}
              </div>

              <div className="text-center">
                <p className={`text-3xl font-bold ${selectedTransaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                  {selectedTransaction.type === "INCOME" ? "+" : "-"}
                  {(selectedTransaction.amount || 0).toLocaleString()} ₸
                </p>
                <p className="text-muted-foreground mt-1">
                  {selectedTransaction.type === "INCOME" ? "Доход" : "Расход"}
                </p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Дата и время</p>
                  <p className="font-medium">{new Date(selectedTransaction.date).toLocaleString("ru-RU")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Категория</p>
                  <p className="font-medium">{getCategoryLabel(selectedTransaction.category)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Обоснование</p>
                  <p className="font-medium">{selectedTransaction.reason}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
