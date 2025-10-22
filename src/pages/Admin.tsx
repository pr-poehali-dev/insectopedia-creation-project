import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} border-r bg-card transition-all duration-300`}>
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {sidebarOpen && <h2 className="text-lg font-semibold">Админ панель</h2>}
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={20} />
          </Button>
        </div>
        
        <nav className="p-2 space-y-1">
          {[
            { icon: 'LayoutDashboard', label: 'Дашборд' },
            { icon: 'Users', label: 'Пользователи' },
            { icon: 'ShoppingCart', label: 'Заказы' },
            { icon: 'Package', label: 'Продукты' },
            { icon: 'Settings', label: 'Настройки' },
          ].map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
            >
              <Icon name={item.icon} size={20} />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-2xl font-bold">Дашборд</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Всего пользователей', value: '1,234', icon: 'Users', change: '+12%' },
              { title: 'Заказы', value: '856', icon: 'ShoppingCart', change: '+8%' },
              { title: 'Доход', value: '₽245,000', icon: 'DollarSign', change: '+23%' },
              { title: 'Продукты', value: '342', icon: 'Package', change: '+5%' },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon name={stat.icon} size={16} className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> за месяц
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="products">Продукты</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Управление пользователями</CardTitle>
                  <CardDescription>Список всех пользователей системы</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-2">
                    <Input placeholder="Поиск пользователей..." className="max-w-sm" />
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: 'Иван Иванов', email: 'ivan@example.com', role: 'Админ', status: 'active' },
                        { name: 'Мария Петрова', email: 'maria@example.com', role: 'Менеджер', status: 'active' },
                        { name: 'Петр Сидоров', email: 'petr@example.com', role: 'Пользователь', status: 'inactive' },
                      ].map((user) => (
                        <TableRow key={user.email}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status === 'active' ? 'Активен' : 'Неактивен'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Icon name="Trash" size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Последние заказы</CardTitle>
                  <CardDescription>Управление заказами клиентов</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>№ Заказа</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: '#1234', customer: 'Иван Иванов', amount: '₽5,400', status: 'completed', date: '22.10.2025' },
                        { id: '#1235', customer: 'Мария Петрова', amount: '₽2,300', status: 'pending', date: '22.10.2025' },
                        { id: '#1236', customer: 'Петр Сидоров', amount: '₽8,900', status: 'processing', date: '21.10.2025' },
                      ].map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                order.status === 'completed' ? 'default' : 
                                order.status === 'processing' ? 'secondary' : 'outline'
                              }
                            >
                              {order.status === 'completed' ? 'Завершён' :
                               order.status === 'processing' ? 'В обработке' : 'Ожидает'}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Товары</CardTitle>
                  <CardDescription>Управление каталогом товаров</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-2">
                    <Input placeholder="Поиск товаров..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Категория" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        <SelectItem value="electronics">Электроника</SelectItem>
                        <SelectItem value="clothing">Одежда</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить товар
                    </Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { name: 'Ноутбук', price: '₽65,000', stock: 12 },
                      { name: 'Телефон', price: '₽45,000', stock: 8 },
                      { name: 'Наушники', price: '₽5,000', stock: 24 },
                    ].map((product) => (
                      <Card key={product.name}>
                        <CardHeader>
                          <CardTitle className="text-base">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Цена:</span>
                              <span className="font-bold">{product.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">На складе:</span>
                              <span>{product.stock} шт</span>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Icon name="Edit" size={14} className="mr-1" />
                                Изменить
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Icon name="Trash" size={14} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки системы</CardTitle>
                  <CardDescription>Конфигурация приложения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Уведомления</Label>
                        <p className="text-sm text-muted-foreground">Получать email уведомления</p>
                      </div>
                      <Switch id="notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics">Аналитика</Label>
                        <p className="text-sm text-muted-foreground">Собирать статистику использования</p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Название компании</Label>
                      <Input id="company" placeholder="Название компании" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email поддержки</Label>
                      <Input id="email" type="email" placeholder="support@example.com" />
                    </div>
                    
                    <Button>Сохранить настройки</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
