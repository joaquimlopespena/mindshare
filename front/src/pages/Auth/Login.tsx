import { useState } from "react"
import logo from "../../assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = useAuthStore((state) => state.login)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const loginMutation = await login({ email, password })
            if (loginMutation) {
                toast.success("Login realizado com sucesso")
            } else {
                toast.error("Email ou senha inválidos")
            }
        } catch {
            toast.error("Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
            <img src={logo} alt="Logo" className="w-64 h-22" />
            <Card className="w-full max-w-md rounded-xl" >
                <CardHeader>
                    <CardTitle className="text-2xl font-bold" >
                        Acesse a plataforma
                    </CardTitle>
                    <CardDescription>
                        Entre com seu email e senha cadastrados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4" >
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Entrando…" : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card> 
            <Card className="w-full max-w-md rounded-xl" >
                <CardHeader>
                    <CardTitle className="text-2xl font-bold" >
                        Ainda não tem uma conta?
                    </CardTitle>
                    <CardDescription>
                        Cadastre-se agora mesmo
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full" asChild >
                        <Link to="/signup">Criar conta</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}