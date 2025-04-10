
import { Bell, Check, X } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { motion, AnimatePresence } from "framer-motion";

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
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => closeNotificationsPanel()}
        />
      )}
      
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeNotificationsPanel()}>
        <SheetContent className="bg-[#333333] text-white border-l border-[#444444] w-[320px] shadow-2xl rounded-l-lg overflow-hidden z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            <SheetHeader className="pb-4 border-b border-[#444444]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-[#FF6200]" />
                  <SheetTitle className="text-white">Notificações</SheetTitle>
                  {unreadCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="bg-[#FF6200] text-white text-xs font-medium rounded-full px-2 py-0.5"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
                    <X size={18} />
                  </Button>
                </SheetClose>
              </div>
              <SheetDescription className="text-gray-400">
                Alertas e notificações recentes de suas obras
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-4 space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent pr-1">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4 text-gray-400"
                  >
                    Nenhuma notificação
                  </motion.p>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div 
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        p-3 rounded-md relative transition-all duration-300 cursor-pointer
                        ${notification.tipo === 'critico' ? 'border-l-2 border-[#FF6200]' : 'border-l-2 border-gray-500'}
                        ${notification.lido ? 'bg-[#333333] opacity-60' : 'bg-[#444444] hover:bg-[#555555]'}
                      `}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="font-medium">{notification.mensagem}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.data}</p>
                        </div>
                        
                        {notification.lido ? (
                          <Check size={16} className="text-gray-500 mt-1 ml-2" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-[#FF6200] mt-2 ml-2"></span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            
            <SheetFooter className="mt-4 border-t border-[#444444] pt-4">
              <Button 
                onClick={markAllAsRead} 
                variant="outline"
                className="w-full border-[#444444] text-gray-300 hover:bg-[#444444] hover:text-white transition-colors duration-300"
              >
                Marcar todas como lidas
              </Button>
            </SheetFooter>
          </motion.div>
        </SheetContent>
      </Sheet>
    </>
  );
}
