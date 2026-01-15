"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RotateCcw, Eye, AlertTriangle } from "lucide-react";

interface SaleItem {
  product: string;
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
  totalCostPrice: number;
  batchAllocations: {
    batch: string;
    quantity: number;
    costPrice: number;
  }[];
}

interface Sale {
  _id: string;
  date: string;
  customerPhone: string;
  paymentTypeName: string;
  taxRateSnapshot: number;
  bankCommissionRateSnapshot: number;
  items: SaleItem[];
  totalAmount: number;
  taxAmount: number;
  bankCommissionAmount: number;
}

interface ReturnItem {
  product: string;
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
  costPrice: number;
}

interface ReturnRecord {
  _id: string;
  sale: string;
  date: string;
  customerPhone: string;
  paymentTypeName: string;
  items: ReturnItem[];
  totalAmount: number;
  refundAmount: number;
  taxAmountReversed: number;
  bankCommissionLost: number;
}

export default function ReturnsPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [returns, setReturns] = useState<ReturnRecord[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<ReturnRecord | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSales();
    fetchReturns();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch("/api/sales");
      const data = await response.json();
      if (data.success) {
        setSales(data.data);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const fetchReturns = async () => {
    try {
      const response = await fetch("/api/returns");
      const data = await response.json();
      if (data.success) {
        setReturns(data.data);
      }
    } catch (error) {
      console.error("Error fetching returns:", error);
    }
  };

  const returnedSaleIds = new Set(returns.map((r) => r.sale));
  const availableSales = sales.filter((s) => !returnedSaleIds.has(s._id));

  const calculateRefundAmount = (sale: Sale): number => {
    return sale.totalAmount - sale.bankCommissionAmount;
  };

  const calculateAverageCostPrice = (item: SaleItem): number => {
    if (!item.batchAllocations || item.batchAllocations.length === 0) {
      return item.totalCostPrice / item.quantity;
    }
    return item.totalCostPrice / item.quantity;
  };

  const processReturn = async () => {
    if (!selectedSale) return;

    setLoading(true);
    try {
      const returnItems = selectedSale.items.map((item) => ({
        product: item.product,
        productName: item.productName,
        sizeLabel: item.sizeLabel,
        quantity: item.quantity,
        priceAtSale: item.priceAtSale,
        costPrice: calculateAverageCostPrice(item),
      }));

      const response = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          saleId: selectedSale._id,
          items: returnItems,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Возврат успешно оформлен!");
        setSelectedSale(null);
        fetchSales();
        fetchReturns();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      alert("Ошибка при оформлении возврата");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Возвраты</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Продажи для возврата</h2>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Тип оплаты</TableHead>
                  <TableHead>Товаров</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>К возврату</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableSales.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      Нет продаж для возврата
                    </TableCell>
                  </TableRow>
                ) : (
                  availableSales.map((sale) => (
                    <TableRow key={sale._id}>
                      <TableCell>
                        {new Date(sale.date).toLocaleDateString("ru-RU")}
                      </TableCell>
                      <TableCell>{sale.customerPhone}</TableCell>
                      <TableCell>{sale.paymentTypeName}</TableCell>
                      <TableCell>{sale.items?.length || 0}</TableCell>
                      <TableCell className="font-semibold">
                        {(sale.totalAmount || 0).toLocaleString()} ₸
                      </TableCell>
                      <TableCell className="font-semibold text-orange-600">
                        {calculateRefundAmount(sale).toLocaleString()} ₸
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSale(sale)}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Возврат
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">История возвратов</h2>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата возврата</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Тип оплаты</TableHead>
                  <TableHead>Сумма продажи</TableHead>
                  <TableHead>Возвращено</TableHead>
                  <TableHead>Потеря комиссии</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      Нет возвратов
                    </TableCell>
                  </TableRow>
                ) : (
                  returns.map((ret) => (
                    <TableRow key={ret._id}>
                      <TableCell>
                        {new Date(ret.date).toLocaleDateString("ru-RU")}
                      </TableCell>
                      <TableCell>{ret.customerPhone}</TableCell>
                      <TableCell>{ret.paymentTypeName}</TableCell>
                      <TableCell>
                        {(ret.totalAmount || 0).toLocaleString()} ₸
                      </TableCell>
                      <TableCell className="font-semibold text-red-600">
                        -{(ret.refundAmount || 0).toLocaleString()} ₸
                      </TableCell>
                      <TableCell className="text-orange-600">
                        {(ret.bankCommissionLost || 0) > 0
                          ? `${(ret.bankCommissionLost || 0).toLocaleString()} ₸`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedReturn(ret)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog
        open={!!selectedSale}
        onOpenChange={(open) => !open && setSelectedSale(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Оформление возврата</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Дата продажи</p>
                  <p className="font-medium">
                    {new Date(selectedSale.date).toLocaleString("ru-RU")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Клиент</p>
                  <p className="font-medium">{selectedSale.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Тип оплаты</p>
                  <p className="font-medium">{selectedSale.paymentTypeName}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Товары к возврату:</h4>
                <div className="space-y-2">
                  {selectedSale.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Размер: {item.sizeLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {item.quantity} шт. × {item.priceAtSale.toLocaleString()} ₸
                        </p>
                        <p className="text-sm text-muted-foreground">
                          = {(item.quantity * item.priceAtSale).toLocaleString()} ₸
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Сумма продажи:</span>
                  <span className="font-semibold">
                    {(selectedSale.totalAmount || 0).toLocaleString()} ₸
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Налог к отмене ({selectedSale.taxRateSnapshot}%):
                  </span>
                  <span>-{(selectedSale.taxAmount || 0).toLocaleString()} ₸</span>
                </div>
                {(selectedSale.bankCommissionAmount || 0) > 0 && (
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700">
                      <AlertTriangle className="h-4 w-4" />
                      <span>
                        Комиссия банка ({selectedSale.bankCommissionRateSnapshot}
                        %) - не возвращается:
                      </span>
                    </div>
                    <span className="font-semibold text-orange-700">
                      {(selectedSale.bankCommissionAmount || 0).toLocaleString()} ₸
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t">
                  <span>Сумма к возврату клиенту:</span>
                  <span>
                    {calculateRefundAmount(selectedSale).toLocaleString()} ₸
                  </span>
                </div>
              </div>

              <Button
                onClick={processReturn}
                disabled={loading}
                variant="destructive"
                className="w-full"
              >
                {loading ? "Оформление..." : "Оформить возврат"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedReturn}
        onOpenChange={(open) => !open && setSelectedReturn(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали возврата</DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Дата возврата</p>
                  <p className="font-medium">
                    {new Date(selectedReturn.date).toLocaleString("ru-RU")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Клиент</p>
                  <p className="font-medium">{selectedReturn.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Тип оплаты</p>
                  <p className="font-medium">{selectedReturn.paymentTypeName}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Возвращённые товары:</h4>
                <div className="space-y-2">
                  {selectedReturn.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Размер: {item.sizeLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {item.quantity} шт. × {item.priceAtSale.toLocaleString()} ₸
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Сумма продажи:</span>
                  <span className="font-semibold">
                    {(selectedReturn.totalAmount || 0).toLocaleString()} ₸
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Налог отменён:</span>
                  <span>
                    -{(selectedReturn.taxAmountReversed || 0).toLocaleString()} ₸
                  </span>
                </div>
                {(selectedReturn.bankCommissionLost || 0) > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Потеря комиссии банка:</span>
                    <span>
                      {(selectedReturn.bankCommissionLost || 0).toLocaleString()} ₸
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t">
                  <span>Возвращено клиенту:</span>
                  <span>
                    {(selectedReturn.refundAmount || 0).toLocaleString()} ₸
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
