import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contratoSchema, type ContratoFormData } from "@/schemas";
import { Contrato } from "@/types";
import { mockClientes, mockServicos } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

interface ContratoFormProps {
  onSubmit: (data: ContratoFormData) => void;
  initialData?: Contrato;
  isLoading?: boolean;
}

export function ContratoForm({ onSubmit, initialData, isLoading }: ContratoFormProps) {
  const form = useForm<ContratoFormData>({
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      dataInicio: initialData?.dataInicio || "",
      dataFim: initialData?.dataFim || "",
      status: initialData?.status || "pendente",
      observacoes: initialData?.observacoes || "",
      cliente: initialData?.cliente ? {
        id: typeof initialData.cliente === 'object' && 'nome' in initialData.cliente ? initialData.cliente.id! : 0,
        nome: typeof initialData.cliente === 'object' && 'nome' in initialData.cliente ? initialData.cliente.nome : "",
      } : { id: 0, nome: "" },
      itens: initialData?.itens?.map(item => ({
        quantidade: item.quantidade,
        valor: item.valor,
        desconto: item.desconto || 0,
        servico: {
          id: typeof item.servico === 'object' && 'nome' in item.servico ? item.servico.id! : 0,
          nome: typeof item.servico === 'object' && 'nome' in item.servico ? item.servico.nome : "",
          valor: typeof item.servico === 'object' && 'nome' in item.servico ? item.servico.valor : 0,
        },
      })) || [
        {
          quantidade: 1,
          valor: 0,
          desconto: 0,
          servico: { id: 0, nome: "", valor: 0 },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itens",
  });

  const watchedItens = form.watch("itens");

  const valorTotal = useMemo(() => {
    return watchedItens.reduce((total, item) => {
      const valorItem = item.quantidade * item.valor;
      const desconto = (valorItem * (item.desconto || 0)) / 100;
      return total + (valorItem - desconto);
    }, 0);
  }, [watchedItens]);

  const addItem = () => {
    append({
      quantidade: 1,
      valor: 0,
      desconto: 0,
      servico: { id: 0, nome: "", valor: 0 },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const cliente = mockClientes.find(c => c.id === parseInt(value));
                    field.onChange(cliente ? { id: cliente.id!, nome: cliente.nome } : { id: 0, nome: "" });
                  }}
                  value={field.value?.id?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockClientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id!.toString()}>
                        {cliente.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Início</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataFim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Fim</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observações sobre o contrato"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Itens do Contrato</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`itens.${index}.servico`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const servico = mockServicos.find(s => s.id === parseInt(value));
                          if (servico) {
                            field.onChange({ id: servico.id!, nome: servico.nome, valor: servico.valor });
                            form.setValue(`itens.${index}.valor`, servico.valor);
                          }
                        }}
                        value={field.value?.id?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockServicos.map((servico) => (
                            <SelectItem key={servico.id} value={servico.id!.toString()}>
                              {servico.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`itens.${index}.quantidade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qtd</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`itens.${index}.valor`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Unit.</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`itens.${index}.desconto`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desconto (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <div className="text-lg font-semibold">
                Valor Total: {formatCurrency(valorTotal)}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : initialData ? "Atualizar" : "Criar Contrato"}
          </Button>
        </div>
      </form>
    </Form>
  );
}