import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { setCurrentUser } from '@/lib/auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || (isRegisterMode && !name)) {
      setError('Заполните все поля.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/3c7f3fd9-ee75-4619-a5dc-40c99bad5de7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: isRegisterMode ? 'register' : 'login',
          email,
          password,
          ...(isRegisterMode && { name })
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Ошибка при выполнении запроса');
        setLoading(false);
        return;
      }

      if (result.success && result.user) {
        setCurrentUser(result.user);
        setLoading(false);
        navigate('/');
      } else {
        setError('Ошибка авторизации');
        setLoading(false);
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Lock" size={24} className="text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isRegisterMode ? 'Регистрация' : 'Вход в систему'}
          </CardTitle>
          <CardDescription className="text-center">
            {isRegisterMode ? 'Создайте новый аккаунт' : 'Введите данные для входа'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <Icon name="AlertCircle" size={16} />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isRegisterMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegisterMode}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isRegisterMode && (
                <p className="text-xs text-muted-foreground">Минимум 6 символов</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  {isRegisterMode ? 'Регистрация...' : 'Вход...'}
                </>
              ) : (
                <>
                  <Icon name={isRegisterMode ? 'UserPlus' : 'LogIn'} size={16} className="mr-2" />
                  {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
                </>
              )}
            </Button>

            <div className="text-center">
              <Button 
                type="button"
                variant="link" 
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError('');
                }}
                className="text-sm"
              >
                {isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;