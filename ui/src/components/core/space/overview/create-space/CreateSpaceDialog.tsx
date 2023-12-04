import { FC } from "react";
import {
    Dialog,
    DialogContent,
} from "@/components/presentational";
import { CreateSpaceForm } from "./CreateSpaceForm";

interface CreateSpaceDialogProps {
    open: boolean;
    onClose: () => void;
}

export const CreateSpaceDialog: FC<CreateSpaceDialogProps> = ({
    open,
    onClose,
}) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"xs"}>
            <DialogContent>
                <CreateSpaceForm onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
};

