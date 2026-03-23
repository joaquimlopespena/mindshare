import { useAuthStore } from "@/stores/auth"
import logo from "@/assets/logo-icon.svg"

interface HeaderProps {
    children?: React.ReactNode
}
export const Header = ({ children }: HeaderProps = {}) => {
    const { user, isAuthenticated } = useAuthStore()
    return (
        <div className="w-full px-16 pt-6">
            {
                isAuthenticated 
                    && 
                <div className="flex justify-between w-full">
                    <div className="min-w-48">
                        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                    </div>
                    
                </div>
            }
        </div>
    )
}
