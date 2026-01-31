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
import { Plus, Trash2, Eye } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  sizes: {
    label: string;
    quantity: number;
  }[];
}

interface PaymentType {
  _id: string;
  name: string;
  taxRate: number;
  bankCommissionRate: number;
}

interface SaleItem {
  product: string;
  productName: string;
  sizeLabel: string;
  quantity: number;
  priceAtSale: number;
}

interface Sale {
  _id: string;
  date: string;
  customerPhone: string;
  paymentTypeName: string;
  deliveryStatus: "not_attached" | "shipped";
  items: SaleItem[];
  totalAmount: number;
  taxAmount: number;
  bankCommissionAmount: number;
}

interface ReturnRecord {
  _id: string;
  sale: string;
}

type SaleStatus = "new" | "shipped" | "returned";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [returns, setReturns] = useState<ReturnRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  useEffect(() => {
    fetchSales();
    fetchReturns();
    fetchProducts();
    fetchPaymentTypes();
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

  const getSaleStatus = (sale: Sale): SaleStatus => {
    if (returnedSaleIds.has(sale._id)) return "returned";
    if (sale.deliveryStatus === "shipped") return "shipped";
    return "new";
  };

  const getStatusLabel = (status: SaleStatus): string => {
    switch (status) {
      case "returned":
        return "Возврат";
      case "shipped":
        return "Отправлен";
      case "new":
        return "Новая";
    }
  };

  const getStatusColor = (status: SaleStatus): string => {
    switch (status) {
      case "returned":
        return "text-red-600 bg-red-50";
      case "shipped":
        return "text-blue-600 bg-blue-50";
      case "new":
        return "text-green-600 bg-green-50";
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchPaymentTypes = async () => {
    try {
      const response = await fetch("/api/payment-types");
      const data = await response.json();
      if (data.success) {
        setPaymentTypes(data.data);
      }
    } catch (error) {
      console.error("Error fetching payment types:", error);
    }
  };

  const selectedProductData = products.find((p) => p._id === selectedProduct);
  const selectedSizeData = selectedProductData?.sizes.find(
    (s) => s.label === selectedSize
  );

  const addItemToSale = () => {
    if (!selectedProduct || !selectedSize || !quantity) {
      alert("Заполните все поля");
      return;
    }

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    const size = product.sizes.find((s) => s.label === selectedSize);
    if (!size) return;

    const qty = parseInt(quantity);
    if (qty > size.quantity) {
      alert(`Недостаточно товара! Доступно: ${size.quantity} шт.`);
      return;
    }

    const newItem: SaleItem = {
      product: selectedProduct,
      productName: product.name,
      sizeLabel: selectedSize,
      quantity: qty,
      priceAtSale: product.discountPrice || product.price,
    };

    setSaleItems([...saleItems, newItem]);
    setSelectedProduct("");
    setSelectedSize("");
    setQuantity("");
  };

  const removeItem = (index: number) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return saleItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtSale,
      0
    );
  };

  const calculateTax = () => {
    const paymentType = paymentTypes.find((pt) => pt._id === selectedPaymentType);
    if (!paymentType) return 0;
    return (calculateTotal() * paymentType.taxRate) / 100;
  };

  const calculateBankCommission = () => {
    const paymentType = paymentTypes.find((pt) => pt._id === selectedPaymentType);
    if (!paymentType) return 0;
    return (calculateTotal() * paymentType.bankCommissionRate) / 100;
  };

  const calculateAmountToBalance = () => {
    return calculateTotal() - calculateBankCommission();
  };

  const formatPhoneNumber = (value: string) => {
    // Удаляем все нечисловые символы
    const digits = value.replace(/\D/g, "");

    // Ограничиваем до 11 цифр (7 + 10 цифр номера)
    const limitedDigits = digits.slice(0, 11);

    // Форматируем по маске +7 (XXX) XXX XX XX
    let formatted = "+7";

    if (limitedDigits.length > 1) {
      formatted += " (" + limitedDigits.slice(1, 4);
    }
    if (limitedDigits.length >= 4) {
      formatted += ") " + limitedDigits.slice(4, 7);
    }
    if (limitedDigits.length >= 7) {
      formatted += " " + limitedDigits.slice(7, 9);
    }
    if (limitedDigits.length >= 9) {
      formatted += " " + limitedDigits.slice(9, 11);
    }

    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCustomerPhone(formatted);
  };

  const createSale = async () => {
    if (!customerPhone || !selectedPaymentType || saleItems.length === 0) {
      alert("Заполните все поля и добавьте хотя бы один товар");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerPhone,
          paymentType: selectedPaymentType,
          items: saleItems,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Продажа успешно создана!");
        setCustomerPhone("");
        setSelectedPaymentType("");
        setSaleItems([]);
        setIsDialogOpen(false);
        fetchSales();
        fetchProducts();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      alert("Ошибка при создании продажи");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Продажи</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Новая продажа
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новая продажа</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Номер покупателя</Label>
                  <Input
                    type="tel"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (777) 777 77 77"
                  />
                </div>

                <div>
                  <Label>Тип оплаты</Label>
                  <Select
                    value={selectedPaymentType}
                    onValueChange={setSelectedPaymentType}
                  >
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
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Добавить товар:</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Товар</Label>
                    <Select
                      value={selectedProduct}
                      onValueChange={(value) => {
                        setSelectedProduct(value);
                        setSelectedSize("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите товар" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            {product.name} - {product.discountPrice || product.price} ₸
                            {product.discountPrice && ` (скидка)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Размер</Label>
                    <Select
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                      disabled={!selectedProduct}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProductData?.sizes.map((size) => (
                          <SelectItem key={size.label} value={size.label}>
                            {size.label} (доступно: {size.quantity} шт.)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>
                      Количество
                      {selectedSizeData && (
                        <span className="text-xs text-muted-foreground ml-2">
                          (макс: {selectedSizeData.quantity})
                        </span>
                      )}
                    </Label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0"
                      min="1"
                      max={selectedSizeData?.quantity || undefined}
                      disabled={!selectedSize}
                    />
                  </div>
                </div>

                <Button
                  onClick={addItemToSale}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить товар в чек
                </Button>
              </div>

              {saleItems.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Товары в чеке:</h3>
                  <div className="space-y-2">
                    {saleItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-secondary rounded"
                      >
                        <span>
                          {item.productName} ({item.sizeLabel}) - {item.quantity} шт. × {item.priceAtSale} ₸
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Сумма продажи:</span>
                      <span className="font-semibold">{calculateTotal().toLocaleString()} ₸</span>
                    </div>
                    {selectedPaymentType && (
                      <>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Налог ({paymentTypes.find(pt => pt._id === selectedPaymentType)?.taxRate}%):</span>
                          <span>{calculateTax().toFixed(2)} ₸</span>
                        </div>
                        {calculateBankCommission() > 0 && (
                          <div className="flex justify-between items-center text-sm text-orange-600">
                            <span>Комиссия банка ({paymentTypes.find(pt => pt._id === selectedPaymentType)?.bankCommissionRate}%):</span>
                            <span>-{calculateBankCommission().toFixed(2)} ₸</span>
                          </div>
                        )}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>К оплате покупателем:</span>
                            <span>{calculateTotal().toLocaleString()} ₸</span>
                          </div>
                          {calculateBankCommission() > 0 && (
                            <div className="flex justify-between items-center text-sm text-green-600 mt-2">
                              <span>Попадет в баланс:</span>
                              <span className="font-semibold">{calculateAmountToBalance().toFixed(2)} ₸</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {!selectedPaymentType && (
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>К оплате:</span>
                        <span>{calculateTotal().toLocaleString()} ₸</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={createSale}
                disabled={loading || saleItems.length === 0 || !customerPhone || !selectedPaymentType}
                className="w-full"
              >
                {loading ? "Создание..." : "Создать продажу"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Тип оплаты</TableHead>
              <TableHead>Товаров</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Налог</TableHead>
              <TableHead>Комиссия</TableHead>
              <TableHead>В баланс</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground">
                  Нет продаж
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => {
                const status = getSaleStatus(sale);
                return (
                  <TableRow key={sale._id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedSale(sale)}>
                    <TableCell>
                      {new Date(sale.date).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusLabel(status)}
                      </span>
                    </TableCell>
                    <TableCell>{sale.customerPhone}</TableCell>
                    <TableCell>{sale.paymentTypeName}</TableCell>
                    <TableCell>{sale.items?.length || 0}</TableCell>
                    <TableCell className="font-semibold">
                      {(sale.totalAmount || 0).toLocaleString()} ₸
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {(sale.taxAmount || 0).toLocaleString()} ₸
                    </TableCell>
                    <TableCell className="text-orange-600">
                      {(sale.bankCommissionAmount || 0) > 0 ? `-${(sale.bankCommissionAmount || 0).toLocaleString()} ₸` : '—'}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {((sale.totalAmount || 0) - (sale.bankCommissionAmount || 0)).toLocaleString()} ₸
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedSale(sale); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Детали продажи */}
      <Dialog open={!!selectedSale} onOpenChange={(open) => !open && setSelectedSale(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали продажи</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Дата</p>
                  <p className="font-medium">{new Date(selectedSale.date).toLocaleString("ru-RU")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Статус</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getSaleStatus(selectedSale))}`}>
                    {getStatusLabel(getSaleStatus(selectedSale))}
                  </span>
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
                <h4 className="font-semibold mb-3">Товары:</h4>
                <div className="space-y-2">
                  {selectedSale.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">Размер: {item.sizeLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity} шт. × {item.priceAtSale.toLocaleString()} ₸</p>
                        <p className="text-sm text-muted-foreground">= {(item.quantity * item.priceAtSale).toLocaleString()} ₸</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Сумма продажи:</span>
                  <span className="font-semibold">{(selectedSale.totalAmount || 0).toLocaleString()} ₸</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Налог:</span>
                  <span>{(selectedSale.taxAmount || 0).toLocaleString()} ₸</span>
                </div>
                {(selectedSale.bankCommissionAmount || 0) > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Комиссия банка:</span>
                    <span>-{(selectedSale.bankCommissionAmount || 0).toLocaleString()} ₸</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-green-600 pt-2 border-t">
                  <span>В баланс:</span>
                  <span>{((selectedSale.totalAmount || 0) - (selectedSale.bankCommissionAmount || 0)).toLocaleString()} ₸</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
