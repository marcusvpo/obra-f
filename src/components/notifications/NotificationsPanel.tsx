
import { Bell, Check, X } from "lucide-react";
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
      {/* Overlay para ofuscar o resto da página */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => closeNotificationsPanel()}
        />
      )}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="fixed z-50 top-4 right-4 w-[300px] max-h-[500px] bg-[#333333] rounded-lg shadow-xl border border-[#444444] flex flex-col"
          >
            {/* Cabeçalho */}
            <div className="px-4 py-3 border-b border-[#444444] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-[#FF6200]" />
                <h3 className="font-medium text-white">Notificações</h3>
                {unreadCount > 0 && (
                  <span className="bg-[#FF6200] text-white text-xs font-medium rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeNotificationsPanel}
                className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#444444]"
              >
                <X size={16} />
              </Button>
            </div>
            
            {/* Lista de notificações com scroll */}
            <div className="overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent p-3 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-center py-4 text-gray-400">Nenhuma notificação</p>
              ) : (
                notifications.map((notification) => (
                  <motion.div 
                    key={notification.id}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      p-3 rounded-md relative transition-all duration-200 cursor-pointer
                      ${notification.tipo === 'critico' ? 'border-l-2 border-[#FF6200]' : 'border-l-2 border-gray-500'}
                      ${notification.lido ? 'bg-[#333333] opacity-60' : 'bg-[#444444] hover:bg-[#555555]'}
                    `}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.mensagem}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.data}</p>
                      </div>
                      
                      {notification.lido ? (
                        <Check size={14} className="text-gray-500 mt-1 ml-2" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-[#FF6200] mt-2 ml-2"></span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {/* Rodapé */}
            <div className="mt-auto p-3 border-t border-[#444444]">
              <Button 
                onClick={markAllAsRead} 
                variant="outline"
                className="w-full text-xs border-[#444444] text-gray-300 hover:bg-[#444444] hover:text-white transition-colors duration-300"
              >
                Marcar todas como lidas
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
