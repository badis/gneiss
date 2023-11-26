import { FC } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    Grid,
} from "@/components/presentational";

interface SpaceDialogProps {
    open: boolean;
    onClose: () => void;
}

export const SpaceDialog: FC<SpaceDialogProps> = ({
    open,
    onClose,
}) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"xs"}>
            <DialogContent>
                <Box
                    sx={{
                        minHeight: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            paddingRight: "20px",
                        }}
                    >
                        Space fields
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

