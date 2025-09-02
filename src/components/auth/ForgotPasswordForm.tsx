import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const { error } = await resetPassword(data.email);
      
      if (error) {
        toast({
          title: 'Erro ao enviar email',
          description: error.message || 'Tente novamente em alguns instantes',
          variant: 'destructive',
        });
      } else {
        setSent(true);
        toast({
          title: 'Email enviado!',
          description: 'Verifique sua caixa de entrada para redefinir sua senha',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Tente novamente em alguns instantes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Email enviado!</h3>
          <p className="text-sm text-muted-foreground">
            Verifique sua caixa de entrada e clique no link para redefinir sua senha.
          </p>
        </div>
        
        <Button variant="outline" onClick={onBack} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao login
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">Esqueceu sua senha?</h3>
          <p className="text-sm text-muted-foreground">
            Digite seu email e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enviar link de recuperação
        </Button>

        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao login
        </Button>
      </form>
    </Form>
  );
};