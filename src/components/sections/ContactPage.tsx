import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const ContactPage = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Обратная связь</h1>
        <p className="text-muted-foreground">Свяжитесь с автором проекта</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" placeholder="your@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">Тема</Label>
            <Input id="contact-subject" placeholder="Тема сообщения" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Сообщение</Label>
            <Textarea id="contact-message" rows={6} placeholder="Ваше сообщение..." />
          </div>

          <Button className="w-full">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить сообщение
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
