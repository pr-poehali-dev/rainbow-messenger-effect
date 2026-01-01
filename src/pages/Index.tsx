import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type ChatType = 'personal' | 'group' | 'channel';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: ChatType;
  online?: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Александра',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
    lastMessage: 'Привет! Как дела?',
    time: '14:32',
    unread: 3,
    type: 'personal',
    online: true
  },
  {
    id: '2',
    name: 'Дизайн команда 🎨',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Design',
    lastMessage: 'Алексей: Отличная работа!',
    time: '13:15',
    unread: 12,
    type: 'group'
  },
  {
    id: '3',
    name: 'Разработка',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Dev',
    lastMessage: 'Мария: Пушу обновление',
    time: '12:48',
    unread: 0,
    type: 'group'
  },
  {
    id: '4',
    name: 'Новости Tech 📱',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Tech',
    lastMessage: 'Вышла новая версия React 19',
    time: '11:20',
    unread: 0,
    type: 'channel'
  },
  {
    id: '5',
    name: 'Дмитрий',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    lastMessage: 'Созвонимся завтра?',
    time: '10:05',
    unread: 0,
    type: 'personal',
    online: false
  },
  {
    id: '6',
    name: 'Маркетинг',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Marketing',
    lastMessage: 'Анна: Нужно обсудить кампанию',
    time: 'Вчера',
    unread: 5,
    type: 'group'
  }
];

const mockMessages: Message[] = [
  { id: '1', text: 'Привет! Как дела?', time: '14:30', isMine: false },
  { id: '2', text: 'Привет! Всё отлично, работаю над новым проектом 🚀', time: '14:31', isMine: true },
  { id: '3', text: 'О, интересно! Расскажешь подробнее?', time: '14:32', isMine: false },
  { id: '4', text: 'Конечно! Это мессенджер с крутым дизайном', time: '14:32', isMine: true },
  { id: '5', text: 'Радужный градиент выглядит потрясающе!', time: '14:33', isMine: true }
];

export default function Index() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<ChatType | 'all'>('all');

  const filteredChats = filter === 'all' 
    ? mockChats 
    : mockChats.filter(chat => chat.type === filter);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: String(messages.length + 1),
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-border flex flex-col bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rainbow-pink via-rainbow-purple to-rainbow-blue bg-clip-text text-transparent">
              Мессенджер
            </h1>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Icon name="Search" size={20} />
            </Button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={filter === 'all' ? 'default' : 'ghost'}
              onClick={() => setFilter('all')}
              className="flex-1"
            >
              Все
            </Button>
            <Button 
              size="sm" 
              variant={filter === 'personal' ? 'default' : 'ghost'}
              onClick={() => setFilter('personal')}
              className="flex-1"
            >
              <Icon name="User" size={14} className="mr-1" />
              Личные
            </Button>
            <Button 
              size="sm" 
              variant={filter === 'group' ? 'default' : 'ghost'}
              onClick={() => setFilter('group')}
              className="flex-1"
            >
              <Icon name="Users" size={14} className="mr-1" />
              Группы
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer transition-all hover:bg-secondary/50 border-b border-border/50 animate-fade-in ${
                selectedChat.id === chat.id ? 'bg-secondary' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-rainbow-green rounded-full border-2 border-card"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 bg-gradient-to-r from-rainbow-pink to-rainbow-purple">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{selectedChat.name}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedChat.type === 'personal' && selectedChat.online && 'В сети'}
                {selectedChat.type === 'personal' && !selectedChat.online && 'Была(был) недавно'}
                {selectedChat.type === 'group' && 'Группа'}
                {selectedChat.type === 'channel' && 'Канал'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Icon name="Phone" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="Video" size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        {/* Messages Area with Rainbow Gradient Background */}
        <ScrollArea className="flex-1 p-6 relative">
          <div 
            className="absolute inset-0 opacity-10 animate-rainbow-shift"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--rainbow-pink)), hsl(var(--rainbow-red)), hsl(var(--rainbow-purple)), hsl(var(--rainbow-blue)), hsl(var(--rainbow-green)))',
              backgroundSize: '400% 400%'
            }}
          />
          <div className="relative space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.isMine
                      ? 'bg-gradient-to-r from-rainbow-purple to-rainbow-blue text-white'
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs ${message.isMine ? 'text-white/70' : 'text-muted-foreground'} block mt-1`}>
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="shrink-0">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Написать сообщение..."
              className="flex-1"
            />
            <Button size="icon" variant="ghost" className="shrink-0">
              <Icon name="Smile" size={20} />
            </Button>
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              className="shrink-0 bg-gradient-to-r from-rainbow-purple to-rainbow-blue hover:opacity-90 transition-opacity"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
