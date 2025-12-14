"use client";

import { useState, useEffect, useCallback } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

interface PaymentType {
  _id: string;
  name: string;
  taxRate: number;
  bankCommissionRate: number;
  isActive: boolean;
  createdAt: string;
}

export default function PaymentTypesPage() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [bankCommissionRate, setBankCommissionRate] = useState("");

  const fetchPaymentTypes = useCallback(async () => {
    try {
      const response = await fetch("/api/payment-types");
      const data = await response.json();
      if (data.success) {
        setPaymentTypes(data.data);
      }
    } catch (error) {
      console.error("Error fetching payment types:", error);
    }
  }, []);

  useEffect(() => {
    fetchPaymentTypes();
  }, [fetchPaymentTypes]);

  const createPaymentType = async () => {
    if (!name || !taxRate || !bankCommissionRate) {
      alert("Заполните все поля");
      return;
    }

    const taxRateNum = parseFloat(taxRate);
    if (taxRateNum < 0 || taxRateNum > 100) {
      alert("Ставка налога должна быть от 0 до 100");
      return;
    }

    const bankCommissionRateNum = parseFloat(bankCommissionRate);
    if (bankCommissionRateNum < 0 || bankCommissionRateNum > 100) {
      alert("Комиссия банка должна быть от 0 до 100");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/payment-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          taxRate: taxRateNum,
          bankCommissionRate: bankCommissionRateNum,
          isActive: true,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Тип оплаты успешно создан!");
        setName("");
        setTaxRate("");
        setBankCommissionRate("");
        setIsDialogOpen(false);
        fetchPaymentTypes();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      alert("Ошибка при создании типа оплаты");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Типы оплаты</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Новый тип оплаты
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый тип оплаты</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Название</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например: Kaspi QR, Наличные"
                />
              </div>

              <div>
                <Label>Ставка налога (%)</Label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="Например: 12 или 12.5"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div>
                <Label>Комиссия банка (%)</Label>
                <Input
                  type="number"
                  value={bankCommissionRate}
                  onChange={(e) => setBankCommissionRate(e.target.value)}
                  placeholder="Например: 2 или 2.5"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Комиссия вычитается из выручки при продаже
                </p>
              </div>

              <Button
                onClick={createPaymentType}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Создание..." : "Создать тип оплаты"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Ставка налога (%)</TableHead>
              <TableHead>Комиссия банка (%)</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата создания</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentTypes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  Нет типов оплаты
                </TableCell>
              </TableRow>
            ) : (
              paymentTypes.map((paymentType) => (
                <TableRow key={paymentType._id}>
                  <TableCell className="font-semibold">
                    {paymentType.name}
                  </TableCell>
                  <TableCell>
                    {Number(paymentType.taxRate) % 1 === 0
                      ? Math.floor(paymentType.taxRate)
                      : paymentType.taxRate}
                    %
                  </TableCell>
                  <TableCell>
                    {Number(paymentType.bankCommissionRate || 0) % 1 === 0
                      ? Math.floor(paymentType.bankCommissionRate || 0)
                      : (paymentType.bankCommissionRate || 0)}
                    %
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        paymentType.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {paymentType.isActive ? "Активный" : "Неактивный"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(paymentType.createdAt).toLocaleDateString(
                      "ru-RU"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
