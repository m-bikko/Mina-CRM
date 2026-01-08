"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Truck, Package, Mail, MapPin, X } from "lucide-react";

interface SaleItem {
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
}

interface PaymentType {
  _id: string;
  name: string;
  taxRate: number;
  bankCommissionRate: number;
}

interface Sale {
  _id: string;
  date: string;
  customerPhone: string;
  paymentTypeName: string;
  items: SaleItem[];
  totalAmount: number;
  deliveryStatus: "not_attached" | "shipped";
  deliveryType?: "local" | "postal";
  deliveryAddress?: string;
  deliveryCharge?: number;
  postalCost?: number;
  deliveryPaymentTypeName?: string;
  deliveryTaxAmount?: number;
  deliveryBankCommissionAmount?: number;
  deliveryBalanceAmount?: number;
}

export default function DeliveryPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Форма доставки
  const [deliveryType, setDeliveryType] = useState<"local" | "postal">("local");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("2000");
  const [postalCost, setPostalCost] = useState("");
  const [deliveryPaymentTypeId, setDeliveryPaymentTypeId] = useState("");

  const fetchSales = useCallback(async () => {
    try {
      const response = await fetch("/api/sales");
      const data = await response.json();
      if (data.success) {
        setSales(data.data);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  }, []);

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
    fetchSales();
    fetchPaymentTypes();
  }, [fetchSales, fetchPaymentTypes]);

  const openDeliveryDialog = (sale: Sale) => {
    setSelectedSale(sale);
    // Заполняем форму существующими данными если есть
    if (sale.deliveryStatus === "shipped") {
      setDeliveryType(sale.deliveryType || "local");
      setDeliveryAddress(sale.deliveryAddress || "");
      setDeliveryCharge(String(sale.deliveryCharge || 2000));
      setPostalCost(String(sale.postalCost || ""));
      // Найти ID типа оплаты по имени
      const pt = paymentTypes.find(p => p.name === sale.deliveryPaymentTypeName);
      setDeliveryPaymentTypeId(pt?._id || "");
    } else {
      setDeliveryType("local");
      setDeliveryAddress("");
      setDeliveryCharge("2000");
      setPostalCost("");
      setDeliveryPaymentTypeId("");
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedSale(null);
  };

  const saveDelivery = async () => {
    if (!selectedSale) return;
    if (!deliveryAddress) {
      alert("Введите адрес доставки");
      return;
    }
    if (deliveryType === "postal" && !deliveryPaymentTypeId) {
      alert("Выберите тип оплаты для почтовой доставки");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/sales/${selectedSale._id}/delivery`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryType,
          deliveryAddress,
          deliveryCharge: deliveryType === "postal" ? Number(deliveryCharge) : undefined,
          postalCost: deliveryType === "postal" ? Number(postalCost) : undefined,
          deliveryPaymentTypeId: deliveryType === "postal" ? deliveryPaymentTypeId : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        closeDialog();
        fetchSales();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      console.error("Error saving delivery:", error);
      alert("Ошибка при сохранении доставки");
    } finally {
      setLoading(false);
    }
  };

  const removeDelivery = async () => {
    if (!selectedSale) return;
    if (!confirm("Вы уверены, что хотите удалить доставку?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/sales/${selectedSale._id}/delivery`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        closeDialog();
        fetchSales();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      console.error("Error removing delivery:", error);
      alert("Ошибка при удалении доставки");
    } finally {
      setLoading(false);
    }
  };

  // Расчёты для предпросмотра
  const selectedPaymentType = paymentTypes.find(pt => pt._id === deliveryPaymentTypeId);
  const charge = Number(deliveryCharge) || 0;
  const postal = Number(postalCost) || 0;
  const bankCommission = selectedPaymentType
    ? Math.round(charge * selectedPaymentType.bankCommissionRate) / 100
    : 0;
  const tax = selectedPaymentType
    ? Math.round(charge * selectedPaymentType.taxRate) / 100
    : 0;
  const balanceAmount = charge - bankCommission - postal;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Доставка</h1>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Товары</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Адрес</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Нет продаж
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale._id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(sale.date).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{sale.customerPhone}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      {sale.items?.map((item, idx) => (
                        <div key={idx} className="text-sm truncate">
                          {item.productName} ({item.sizeLabel}) x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold whitespace-nowrap">
                    {(sale.totalAmount || 0).toLocaleString()} ₸
                  </TableCell>
                  <TableCell>
                    {sale.deliveryStatus === "shipped" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <Truck className="h-3 w-3" />
                        Отправлена
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        <Package className="h-3 w-3" />
                        Не прикреплена
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {sale.deliveryType === "local" && (
                      <span className="inline-flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        Местная
                      </span>
                    )}
                    {sale.deliveryType === "postal" && (
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        Почта
                      </span>
                    )}
                    {!sale.deliveryType && "—"}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {sale.deliveryAddress || "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={sale.deliveryStatus === "shipped" ? "outline" : "default"}
                      size="sm"
                      onClick={() => openDeliveryDialog(sale)}
                    >
                      {sale.deliveryStatus === "shipped" ? "Изменить" : "Прикрепить"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Диалог прикрепления/редактирования доставки */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedSale?.deliveryStatus === "shipped"
                ? "Редактировать доставку"
                : "Прикрепить доставку"}
            </DialogTitle>
          </DialogHeader>

          {selectedSale && (
            <div className="space-y-4 mt-4">
              {/* Информация о продаже */}
              <div className="p-3 bg-muted rounded-lg text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Клиент:</span>
                  <span className="font-medium">{selectedSale.customerPhone}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Сумма продажи:</span>
                  <span className="font-medium">{selectedSale.totalAmount.toLocaleString()} ₸</span>
                </div>
              </div>

              {/* Тип доставки */}
              <div>
                <Label>Тип доставки</Label>
                <Select value={deliveryType} onValueChange={(v: "local" | "postal") => setDeliveryType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Местная доставка (Яндекс курьер и т.д.)
                      </div>
                    </SelectItem>
                    <SelectItem value="postal">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Почтовая доставка
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Адрес */}
              <div>
                <Label>Адрес доставки</Label>
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Введите адрес"
                />
              </div>

              {/* Поля для почтовой доставки */}
              {deliveryType === "postal" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Стоимость для клиента</Label>
                      <Input
                        type="number"
                        value={deliveryCharge}
                        onChange={(e) => setDeliveryCharge(e.target.value)}
                        placeholder="2000"
                      />
                    </div>
                    <div>
                      <Label>Стоимость почты</Label>
                      <Input
                        type="number"
                        value={postalCost}
                        onChange={(e) => setPostalCost(e.target.value)}
                        placeholder="800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Тип оплаты</Label>
                    <Select value={deliveryPaymentTypeId} onValueChange={setDeliveryPaymentTypeId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип оплаты" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentTypes.map((pt) => (
                          <SelectItem key={pt._id} value={pt._id}>
                            {pt.name} (налог {pt.taxRate}%
                            {pt.bankCommissionRate > 0 && `, комиссия ${pt.bankCommissionRate}%`})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Предпросмотр расчёта */}
                  {deliveryPaymentTypeId && (
                    <div className="p-3 bg-muted rounded-lg space-y-2 text-sm">
                      <div className="font-medium mb-2">Расчёт:</div>
                      <div className="flex justify-between">
                        <span>Клиент платит:</span>
                        <span>{charge.toLocaleString()} ₸</span>
                      </div>
                      {bankCommission > 0 && (
                        <div className="flex justify-between text-orange-600">
                          <span>Комиссия банка ({selectedPaymentType?.bankCommissionRate}%):</span>
                          <span>-{bankCommission.toLocaleString()} ₸</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground">
                        <span>К накопительному налогу ({selectedPaymentType?.taxRate}%):</span>
                        <span>+{tax.toLocaleString()} ₸</span>
                      </div>
                      {postal > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Стоимость почты:</span>
                          <span>-{postal.toLocaleString()} ₸</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-green-600 pt-2 border-t">
                        <span>В баланс:</span>
                        <span>{balanceAmount.toLocaleString()} ₸</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Кнопки */}
              <div className="flex gap-2 pt-4">
                {selectedSale.deliveryStatus === "shipped" && (
                  <Button
                    variant="destructive"
                    onClick={removeDelivery}
                    disabled={loading}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Удалить
                  </Button>
                )}
                <Button
                  onClick={saveDelivery}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Сохранение..." : "Сохранить"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
