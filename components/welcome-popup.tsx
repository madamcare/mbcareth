"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Clock, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const POPUP_DISMISS_KEY = "minebit_popup_dismissed_until"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dismissedUntil = localStorage.getItem(POPUP_DISMISS_KEY)
    
    if (dismissedUntil) {
      const dismissedTime = parseInt(dismissedUntil, 10)
      const now = Date.now()
      
      if (now < dismissedTime) {
        // Still within the 1-hour dismissal period
        return
      }
    }
    
    // Show popup
    setIsOpen(true)
  }, [])

  const handleDismissForOneHour = () => {
    const oneHourFromNow = Date.now() + 60 * 60 * 1000 // 1 hour in milliseconds
    localStorage.setItem(POPUP_DISMISS_KEY, oneHourFromNow.toString())
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="max-w-md border-primary/20">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl text-center w-full">ยินดีต้อนรับสู่ MineBit Store</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-center w-full">
            เว็บไซต์นี้เป็น<span className="font-semibold text-foreground">เว็บแสดงสินค้าเท่านั้น</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">ต้องการสั่งซื้อสินค้า?</p>
              <p className="text-sm text-muted-foreground">
                กรุณาติดต่อเราผ่าน{" "}
                <a 
                  href="https://discord.gg/minebit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-[#5865F2] underline hover:text-[#4752C4] transition-colors"
                >
                  Discord
                </a>{" "}
                เพื่อสั่งซื้อสินค้าและรับบริการจากทีมงาน
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={handleClose} className="w-full">
            เข้าใจแล้ว
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDismissForOneHour}
            className="w-full gap-2"
          >
            <Clock className="h-4 w-4" />
            ปิดแจ้งเตือน 1 ชั่วโมง
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
