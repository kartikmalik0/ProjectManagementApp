import { EllipsisVertical } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

const ActionDropDown = () => {
    return (
        <div className=" absolute right-1 top-[7.5px]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={"sm"} className="px-2 opacity-70">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                    // checked={showStatusBar}
                    // onCheckedChange={setShowStatusBar}
                    >
                       Edit
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        // checked={showActivityBar}
                        // onCheckedChange={setShowActivityBar}
                        className="text-red-500"
                    >
                        Delete
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ActionDropDown
