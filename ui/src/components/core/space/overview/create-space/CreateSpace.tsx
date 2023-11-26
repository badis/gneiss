import { FC, useState } from "react";

import { SpaceDialog } from "@/components/core/space";
import { Button } from "@/components/presentational";

interface CreateSpaceProps { }
export const CreateSpace: FC<CreateSpaceProps> = () => {
    const [openSpaceDialog, setOpenSpaceDialog] = useState(false);

    const handleOpenSpaceDialog = () => {
        setOpenSpaceDialog(true);
    };

    const handleCloseSpaceDialog = () => {
        setOpenSpaceDialog(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenSpaceDialog}>
                Create space
            </Button>
            <SpaceDialog
                open={openSpaceDialog}
                onClose={handleCloseSpaceDialog}
            />
        </>
    );
};
