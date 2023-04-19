import { Button, Dialog, DialogContent, DialogTitle, Typography, makeStyles } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import React from 'react'





export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup} maxWidth="lg" >
            <DialogTitle >
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => { setOpenPopup(false) }}>
                        <GridCloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}