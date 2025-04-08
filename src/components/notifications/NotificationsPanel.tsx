
import { X, Bell } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPanel() {
  const { 
    notifications, 
    isOpen, 
    closeNotificationsPanel, 
    markAsRead, 
    markAllAsRead,
    getUnreadCount
  } = useNotifications();
  
  const unreadCount = getUnreadCount();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeNotificationsPanel()}>
      <SheetContent className="bg-[#333333] text-white border-l border-[#444444] w-[350px]">
        <SheetHeader className="pb-4 border-b border-[#444444]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-[#FF6200]" />
              <SheetTitle className="text-white">Notificações</SheetTitle>
              {unreadCount > 0 && (
                <span className="bg-[#FF6200] text-white text-xs font-medium rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" className="text-white" onClick={closeNotificationsPanel}>
              <X size={18} />
            </Button>
          </div>
          <SheetDescription className="text-gray-400">
            Alertas e notificações recentes de suas obras
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-4 space-y-2 max-h-[70vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center py-4 text-gray-400">Nenhuma notificação</p>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`
                  p-3 rounded-md relative transition-colors
                  ${notification.tipo === 'critico' ? 'border-l-2 border-[#FF6200]' : 'border-l-2 border-gray-500'}
                  ${notification.lido ? 'bg-[#333333] opacity-60' : 'bg-[#444444]'}
                `}
                onClick={() => markAsRead(notification.id)}
              >
                {!notification.lido && (
                  <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#FF6200]"></span>
                )}
                <p className="font-medium">{notification.mensagem}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.data}</p>
              </div>
            ))
          )}
        </div>
        
        <SheetFooter className="mt-6">
          <Button 
            onClick={markAllAsRead} 
            variant="outline"
            className="w-full border-[#444444] text-gray-300 hover:bg-[#444444] hover:text-white"
          >
            Marcar todas como lidas
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
