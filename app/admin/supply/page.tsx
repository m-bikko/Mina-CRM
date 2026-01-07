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
  sizes: {
    label: string;
    quantity: number;
  }[];
}

interface SupplyItem {
  product: string;
  productName: string;
  sizeLabel: string;
  quantity: number;
  costPrice: number;
}

interface Supply {
  _id: string;
  date: string;
  items: SupplyItem[];
  totalCost: number;
}

export default function SupplyPage() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);

  const [supplyItems, setSupplyItems] = useState<SupplyItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [costPrice, setCostPrice] = useState<string>("");

  useEffect(() => {
    fetchSupplies();
    fetchProducts();
  }, []);

  const fetchSupplies = async () => {
    try {
      const response = await fetch("/api/supplies");
      const data = await response.json();
      if (data.success) {
        setSupplies(data.data);
      }
    } catch (error) {
      console.error("Error fetching supplies:", error);
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

  const selectedProductData = products.find((p) => p._id === selectedProduct);

  const addItemToSupply = () => {
    if (!selectedProduct || !selectedSize || !quantity || !costPrice) {
      alert("Заполните все поля");
      return;
    }

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    const newItem: SupplyItem = {
      product: selectedProduct,
      productName: product.name,
      sizeLabel: selectedSize,
      quantity: parseInt(quantity),
      costPrice: parseFloat(costPrice),
    };

    setSupplyItems([...supplyItems, newItem]);
    setSelectedProduct("");
    setSelectedSize("");
    setQuantity("");
    setCostPrice("");
  };

  const removeItem = (index: number) => {
    setSupplyItems(supplyItems.filter((_, i) => i !== index));
  };

  const calculateTotal = (): number => {
    return supplyItems.reduce(
      (sum, item) => sum + item.quantity * item.costPrice,
      0
    );
  };

  const createSupply = async () => {
    if (supplyItems.length === 0) {
      alert("Добавьте хотя бы один товар");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/supplies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: supplyItems,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Завоз успешно создан!");
        setSupplyItems([]);
        setIsDialogOpen(false);
        fetchSupplies();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      alert("Ошибка при создании завоза");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Завозы</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать завоз
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новый завоз</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
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
                          {product.name}
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
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Количество</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                    min="1"
                  />
                </div>

                <div>
                  <Label>Цена закупа (за ед.)</Label>
                  <Input
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <Button onClick={addItemToSupply} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Добавить товар в список
              </Button>

              {supplyItems.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Товары в завозе:</h3>
                  <div className="space-y-2">
                    {supplyItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-secondary rounded"
                      >
                        <span>
                          {item.productName} ({item.sizeLabel}) - {item.quantity} шт. × {item.costPrice} ₸
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
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Итого:</span>
                      <span>{calculateTotal().toLocaleString()} ₸</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={createSupply}
                disabled={loading || supplyItems.length === 0}
                className="w-full"
              >
                {loading ? "Создание..." : "Создать завоз"}
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
              <TableHead>Количество позиций</TableHead>
              <TableHead>Общая сумма</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Нет завозов
                </TableCell>
              </TableRow>
            ) : (
              supplies.map((supply) => (
                <TableRow key={supply._id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedSupply(supply)}>
                  <TableCell>
                    {new Date(supply.date).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell>{supply.items?.length || 0}</TableCell>
                  <TableCell className="font-semibold">
                    {(supply.totalCost || 0).toLocaleString()} ₸
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedSupply(supply); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Детали завоза */}
      <Dialog open={!!selectedSupply} onOpenChange={(open) => !open && setSelectedSupply(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали завоза</DialogTitle>
          </DialogHeader>
          {selectedSupply && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Дата</p>
                <p className="font-medium">{new Date(selectedSupply.date).toLocaleString("ru-RU")}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Товары:</h4>
                <div className="space-y-2">
                  {selectedSupply.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">Размер: {item.sizeLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity} шт. × {item.costPrice.toLocaleString()} ₸</p>
                        <p className="text-sm text-muted-foreground">= {(item.quantity * item.costPrice).toLocaleString()} ₸</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{(selectedSupply.totalCost || 0).toLocaleString()} ₸</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
