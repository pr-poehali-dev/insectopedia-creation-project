import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-3">О проекте</h3>
            <p className="text-sm text-muted-foreground">
              Научно-образовательная энциклопедия, посвященная миру насекомых
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Разделы</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Энциклопедия</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Классификация</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Поиск</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Сообщество</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Обратная связь</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Форум</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Участникам</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">О проекте</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Условия использования</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Конфиденциальность</a></li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Энциклопедия насекомых. Содержание доступно по лицензии Creative Commons.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
