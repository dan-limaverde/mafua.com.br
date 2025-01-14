import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const body = [
        `Nome: ${formData.name}`,
        `Email: ${formData.email}`,
        '',
        formData.message
      ].join('\n');

      const mailtoLink = `mailto:dan@mafua.com.br?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
      setSubmitStatus('success');
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-4 relative">
      {/* Radial glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#292D3E] opacity-15 rounded-full blur-[100px]"
        aria-hidden="true"
      />
      
      <div className="container max-w-[600px] relative">
        <div className="text-center mb-8">
          <img 
            src="./logo.svg" 
            alt="Logo" 
            className="w-[600px] h-[200px] mx-auto animate-fade-in delay-300"
          />
          <h1 className="text-[32px] md:text-[24px] font-normal animate-fade-in delay-500">
            Estamos construindo nosso novo site!
          </h1>
          <p className="text-[18px] md:text-[16px] text-[#AAAAAA] animate-fade-in delay-800">
            Volte em breve.
          </p>
        </div>

        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-lg p-6 md:p-8 animate-fade-in delay-1200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                className="bg-[rgba(255,255,255,0.1)] border-none text-white placeholder:text-[#AAAAAA]"
              />
              {errors.name && (
                <p className="text-red-400 flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="bg-[rgba(255,255,255,0.1)] border-none text-white placeholder:text-[#AAAAAA]"
              />
              {errors.email && (
                <p className="text-red-400 flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Qual o assunto?"
                className="bg-[rgba(255,255,255,0.1)] border-none text-white placeholder:text-[#AAAAAA]"
              />
              {errors.subject && (
                <p className="text-red-400 flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Sua mensagem aqui..."
                className="bg-[rgba(255,255,255,0.1)] border-none text-white placeholder:text-[#AAAAAA]"
              />
              {errors.message && (
                <p className="text-red-400 flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#3D5AFE] hover:bg-[#2C44CC] hover:scale-105 transition-all duration-200 ease-out"
            >
              Enviar Mensagem
              <Send className="ml-2 w-5 h-5" />
            </Button>

            {submitStatus === 'success' && (
              <p className="text-[18px] text-center mt-4 animate-fade-in">
                Sua mensagem foi enviada!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-center mt-4">
                Por favor, corrija os erros acima.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;