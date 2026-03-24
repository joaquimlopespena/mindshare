import { Page } from "@/components/Page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react"
import { CreateIdeiaDialog } from "./components/CreateIdeiaDialog"
import { useState } from "react"
import type { Ideia } from "@/types"


export const Ideias = () => {
    const [open, setOpen] = useState(false)
    
    function handleSuccess( idea: Ideia ) {
        console.log(idea)
        setOpen(false)
    }
    return (
        <Page>  
            <div className="space-x-6">
                <div className="flex items-center justify-between">
                    <Label className="text-3xl font-medium text-purple-600">
                        Ideias
                    </Label>
                    <Button onClick={() => setOpen(true)}>
                        <PlusIcon className="mr-2 w-4 h-4" />
                        Nova Ideia
                    </Button>
                </div>
            </div>
            <div>   

            </div>
            <CreateIdeiaDialog open={open} onOpenChange={setOpen} onSuccess={() => {}} />
        </Page>
    )
}