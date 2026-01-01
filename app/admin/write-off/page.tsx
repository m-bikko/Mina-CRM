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

interface InventoryBatch {
  _id: string;
  product: string;
  productName: string;
  sizeLabel: string;
  costPrice: number;
  remainingQuantity: number;
  createdAt: string;
  supply: {
    _id: string;
    date: string;
  } | null;
}

interface WriteOffItem {
  inventoryBatchId: string;
  productName: string;
  sizeLabel: string;
  quantity: number;
  costPrice: number;
  supplyDate: string;
  maxQuantity: number;
}

interface WriteOffRecord {
  _id: string;
  date: string;
  items: {
    productName: string;
    sizeLabel: string;
    quantity: number;
    costPrice: number;
    supplyDate: string;
  }[];
  totalRefund: number;
  reason: string;
}

export default function WriteOffPage() {
  const [writeOffs, setWriteOffs] = useState<WriteOffRecord[]>([]);
  const [batches, setBatches] = useState<InventoryBatch[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedWriteOff, setSelectedWriteOff] = useState<WriteOffRecord | null>(null);

  const [writeOffItems, setWriteOffItems] = useState<WriteOffItem[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    fetchWriteOffs();
    fetchBatches();
  }, []);

  const fetchWriteOffs = async () => {
    try {
      const response = await fetch("/api/write-offs");
      const data = await response.json();
      if (data.success) {
        setWriteOffs(data.data);
      }
    } catch (error) {
      console.error("Error fetching write-offs:", error);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await fetch("/api/inventory-batches");
      const data = await response.json();
      if (data.success) {
        setBatches(data.data);
      }
    } catch (error) {
      console.error("Error fetching inventory batches:", error);
    }
  };

  const getSelectedBatchData = () => {
    return batches.find((b) => b._id === selectedBatch);
  };

  const addItemToWriteOff = () => {
    if (!selectedBatch || !quantity) {
      alert("Выберите партию и укажите количество");
      return;
    }

    const batch = getSelectedBatchData();
    if (!batch) return;

    const qty = parseInt(quantity);
    if (qty <= 0) {
      alert("Количество должно быть больше 0");
      return;
    }

    // Check if this batch is already in the list
    const existingIndex = writeOffItems.findIndex(
      (item) => item.inventoryBatchId === selectedBatch
    );

    if (existingIndex !== -1) {
      // Update existing item
      const existingQty = writeOffItems[existingIndex].quantity;
      if (existingQty + qty > batch.remainingQuantity) {
        alert(`Превышено доступное количество. Доступно: ${batch.remainingQuantity - existingQty}`);
        return;
      }

      setWriteOffItems((prev) =>
        prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      if (qty > batch.remainingQuantity) {
        alert(`Превышено доступное количество. Доступно: ${batch.remainingQuantity}`);
        return;
      }

      const newItem: WriteOffItem = {
        inventoryBatchId: selectedBatch,
        productName: batch.productName,
        sizeLabel: batch.sizeLabel,
        quantity: qty,
        costPrice: batch.costPrice,
        supplyDate: batch.supply?.date || batch.createdAt,
        maxQuantity: batch.remainingQuantity,
      };

      setWriteOffItems([...writeOffItems, newItem]);
    }

    setSelectedBatch("");
    setQuantity("");
  };

  const removeItem = (index: number) => {
    setWriteOffItems(writeOffItems.filter((_, i) => i !== index));
  };

  const calculateTotal = (): number => {
    return writeOffItems.reduce(
      (sum, item) => sum + item.quantity * item.costPrice,
      0
    );
  };

  const createWriteOff = async () => {
    if (writeOffItems.length === 0) {
      alert("Добавьте хотя бы один товар");
      return;
    }

    if (!reason.trim()) {
      alert("Укажите причину списания");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/write-offs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: writeOffItems.map((item) => ({
            inventoryBatchId: item.inventoryBatchId,
            quantity: item.quantity,
          })),
          reason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Списание успешно создано!");
        setWriteOffItems([]);
        setReason("");
        setIsDialogOpen(false);
        fetchWriteOffs();
        fetchBatches();
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (error) {
      alert("Ошибка при создании списания");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Списания</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать списание
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новое списание</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Выберите партию товара</Label>
                <Select
                  value={selectedBatch}
                  onValueChange={setSelectedBatch}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите партию" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.length === 0 ? (
                      <div className="px-2 py-4 text-center text-muted-foreground">
                        Нет доступных партий
                      </div>
                    ) : (
                      batches.map((batch) => (
                        <SelectItem key={batch._id} value={batch._id}>
                          <span>
                            {batch.productName} ({batch.sizeLabel}) — {new Date(batch.supply?.date || batch.createdAt).toLocaleDateString("ru-RU")} — {batch.costPrice.toLocaleString()} ₸ — {batch.remainingQuantity} шт
                          </span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {selectedBatch && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Выбранная партия:</strong> {getSelectedBatchData()?.productName} ({getSelectedBatchData()?.sizeLabel})
                  </p>
                  <p className="text-sm">
                    <strong>Цена закупа:</strong> {getSelectedBatchData()?.costPrice.toLocaleString()} ₸
                  </p>
                  <p className="text-sm">
                    <strong>Доступно:</strong> {getSelectedBatchData()?.remainingQuantity} шт
                  </p>
                </div>
              )}

              <div>
                <Label>Количество для списания</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  min="1"
                  max={getSelectedBatchData()?.remainingQuantity}
                />
              </div>

              <Button onClick={addItemToWriteOff} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Добавить в список
              </Button>

              {writeOffItems.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Товары для списания:</h3>
                  <div className="space-y-2">
                    {writeOffItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-secondary rounded"
                      >
                        <div>
                          <span className="font-medium">
                            {item.productName} ({item.sizeLabel})
                          </span>
                          <p className="text-sm text-muted-foreground">
                            Закуп от {new Date(item.supplyDate).toLocaleDateString("ru-RU")} — {item.costPrice.toLocaleString()} ₸/шт
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>{item.quantity} шт × {item.costPrice.toLocaleString()} ₸</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Возврат в баланс:</span>
                      <span className="text-green-600">+{calculateTotal().toLocaleString()} ₸</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label>Причина списания</Label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Например: Брак, ошибка при завозе"
                />
              </div>

              <Button
                onClick={createWriteOff}
                disabled={loading || writeOffItems.length === 0 || !reason.trim()}
                className="w-full"
              >
                {loading ? "Создание..." : "Создать списание"}
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
              <TableHead>Причина</TableHead>
              <TableHead>Количество позиций</TableHead>
              <TableHead>Возврат в баланс</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {writeOffs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Нет списаний
                </TableCell>
              </TableRow>
            ) : (
              writeOffs.map((writeOff) => (
                <TableRow key={writeOff._id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedWriteOff(writeOff)}>
                  <TableCell>
                    {new Date(writeOff.date).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{writeOff.reason}</TableCell>
                  <TableCell>{writeOff.items?.length || 0}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    +{(writeOff.totalRefund || 0).toLocaleString()} ₸
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedWriteOff(writeOff); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Детали списания */}
      <Dialog open={!!selectedWriteOff} onOpenChange={(open) => !open && setSelectedWriteOff(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали списания</DialogTitle>
          </DialogHeader>
          {selectedWriteOff && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Дата</p>
                  <p className="font-medium">{new Date(selectedWriteOff.date).toLocaleString("ru-RU")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Причина</p>
                  <p className="font-medium">{selectedWriteOff.reason}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Списанные товары:</h4>
                <div className="space-y-2">
                  {selectedWriteOff.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Размер: {item.sizeLabel} | Закуп от {new Date(item.supplyDate).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity} шт × {item.costPrice.toLocaleString()} ₸</p>
                        <p className="text-sm text-green-600">+{(item.quantity * item.costPrice).toLocaleString()} ₸</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Возврат в баланс:</span>
                  <span className="text-green-600">+{(selectedWriteOff.totalRefund || 0).toLocaleString()} ₸</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
