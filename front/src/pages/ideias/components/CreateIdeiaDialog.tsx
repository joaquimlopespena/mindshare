import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMutation } from "@apollo/client/react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { CREATE_IDEIA } from "@/lib/graphql/mutations/Ideia"
import { toast } from "sonner"

interface CreateIdeiaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export const CreateIdeiaDialog = ({ open, onOpenChange, onSuccess }: CreateIdeiaDialogProps) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [createIdeia, { loading }] = useMutation(CREATE_IDEIA, {
        onCompleted(data) {
            toast.success("Ideia criada com sucesso")
            onOpenChange(false)
            onSuccess?.()
        },
        onError(error) {
            toast.error("Erro ao criar ideia")
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        createIdeia({
            variables: { data: { title, description } },
        })
    }

    const handleCancel = () => {
        setTitle("")
        setDescription("")
        onOpenChange(false)
      }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-bold leading-tight">Compartilhe sua ideia</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Adicione uma nova ideia para o seu time.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                    <div className="space-y-1">
                        <Label htmlFor="title" className="text-sm font-normal">
                            Título
                        </Label>
                        <Input
                            id="title"
                            placeholder="Dê um nome para a sua ideia"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="description" className="text-sm font-normal">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Descreva sua ideia"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="resize-none"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            Salvar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}