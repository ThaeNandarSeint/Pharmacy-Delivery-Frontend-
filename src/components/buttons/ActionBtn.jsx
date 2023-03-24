import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

// icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

const ActionBtn = ({ params, handleActions, actions }) => {
  const anchorEl = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={isOpen ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={onOpen}
        ref={anchorEl}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl.current}
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleActions[0](params.row._id)}>{actions[0]}</MenuItem>
        <MenuItem onClick={() => handleActions[1](params.row._id)}>{actions[1]}</MenuItem>
        <MenuItem
          onClick={() => handleActions[2](params.row._id)}
        >
          {actions[2]}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionBtn;
