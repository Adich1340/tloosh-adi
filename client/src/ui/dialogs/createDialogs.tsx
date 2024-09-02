import { useState } from "react";
import ReactDOM from "react-dom/client";
import ConfirmDialog from "./confirmDialog";

interface createConfirmDialogProps {
  title: string;
  content: string;
  onOk: Function;
  onCancel: Function;
}

export const createConfirmDialog = ({
  title,
  content,
  onOk,
  onCancel,
}: createConfirmDialogProps) => {
  const dialogContainer = document.createElement("div");
  document.body.appendChild(dialogContainer);

  const root = ReactDOM.createRoot(dialogContainer);
  const ConfirmDialogWrapper = () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
      root.unmount();
      document.body.removeChild(dialogContainer);
    };

    return (
      <ConfirmDialog
        open={open}
        title={title}
        content={content}
        onCancel={() => {
          handleClose();
          if (onCancel) onCancel();
        }}
        onOk={() => {
          handleClose();
          if (onOk) onOk();
        }}
      />
    );
  };

  root.render(<ConfirmDialogWrapper />); // Render using the root
};
