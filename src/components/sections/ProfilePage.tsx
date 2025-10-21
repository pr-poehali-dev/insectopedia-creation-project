import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  isLoggedIn: boolean;
  username: string;
  onLogin: () => void;
  onLogout: () => void;
}

const ProfilePage = ({ isLoggedIn, username, onLogin, onLogout }: ProfilePageProps) => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-l-4 border-primary pl-6 py-4">
        <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
        <p className="text-muted-foreground">Управление профилем</p>
      </div>

      {isLoggedIn ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{username}</h2>
                <p className="text-sm text-muted-foreground">Участник сообщества</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Активность</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 border rounded">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Статей</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Комментариев</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-xs text-muted-foreground">Избранное</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={onLogout}>
                Выйти
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Вход в систему</CardTitle>
                <CardDescription>Введите данные для входа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email или имя пользователя</Label>
                  <Input id="login-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input id="login-password" type="password" />
                </div>
                <Button className="w-full" onClick={onLogin}>
                  Войти
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>Создайте новый аккаунт</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Имя пользователя</Label>
                  <Input id="reg-username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <Input id="reg-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password-confirm">Повторите пароль</Label>
                  <Input id="reg-password-confirm" type="password" />
                </div>
                <Button className="w-full">
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProfilePage;
