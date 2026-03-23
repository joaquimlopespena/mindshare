import { useAuthStore } from "@/stores/auth"
import logo from "@/assets/logo-icon.svg"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

interface HeaderProps {
    children?: React.ReactNode
}
export const Header = ({ children }: HeaderProps = {}) => {
    const { user, isAuthenticated, logout } = useAuthStore()
    return (
        <div className="w-full px-16 pt-6">
            {
                isAuthenticated 
                    && 
                <div className="flex justify-between w-full items-center">
                    <div className="min-w-48">
                        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{user?.name}</span>
                        <Button variant="ghost" size="sm" onClick={logout}>
                            <LogOutIcon className="size-4" />
                            Sair
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}
