import { ListItem, ListItemText, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { ReactElement, useState } from "react";
import { createConfirmDialog } from "../dialogs/createDialogs";

interface MoreOptionsDropdownMenuProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  menuOptions: menuOptionsInterface[];
  onClose: () => void;
}

export interface menuOptionsInterface {
  title: string;
  leftItem?: ReactElement;
  click: Function;
}

export const MoreOptionsDropdownMenu: React.FC<
  MoreOptionsDropdownMenuProps
> = ({ open, anchorEl, menuOptions, onClose }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "lock-button",
        role: "listbox",
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: -35,
        horizontal: "left",
      }}
    >
      {menuOptions.map(({ title, leftItem, click }) => {
        return (
          <MenuItem
            key={title}
            onClick={(e) => {
              if (click) {
                e.stopPropagation();
                setDialogOpen(true);
                createConfirmDialog({
                  title: "Are you sure you want to hide this offer?",
                  content:
                    "Hiding this offer will prevent it from being displayed in the future. Please confirm if you would like to proceed with this action or choose 'Discard' to continue without hiding.",
                  onOk: () => click(),
                  onCancel: () => setDialogOpen(false),
                });
                onClose();
              }
            }}
            sx={{ width: 175 }}
          >
            {leftItem && (
              <ListItem
                style={{
                  width: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {leftItem}
              </ListItem>
            )}
            <ListItemText className="rowItemTitle">{title}</ListItemText>
          </MenuItem>
        );
      })}
    </Menu>
  );
};
