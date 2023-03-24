import { Button, Fade, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

// icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SecurityIcon from '@mui/icons-material/Security';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PersonIcon from '@mui/icons-material/Person';

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

const EditRoleBtn = ({ params, roleType, handleEditRole }) => {
  const anchorEl = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   const roles = [
  //     "Superadmin",
  //     "Admin",
  //     "Supervisor",
  //     "Operator",
  //     "DeliveryPerson",
  //     "Customer",
  //   ];

  const roles = [
    { roleType: "Superadmin", icon: <SecurityIcon />},
    { roleType: "Admin", icon: <AdminPanelSettingsIcon /> },
    { roleType: "Supervisor", icon: <SupervisorAccountIcon /> },
    { roleType: "Operator", icon: <SupportAgentIcon /> },
    { roleType: "DeliveryPerson", icon: <DeliveryDiningIcon /> },
    { roleType: "Customer", icon: <PersonIcon /> },
  ];

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={onOpen}
        ref={anchorEl}
        color="secondary"
        variant="contained"
        sx={{ pr: 1 }}
      >
        {roleType} <ArrowDropDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl.current}
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Fade}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {roles.map(({ roleType, icon }) => (
          <MenuItem
            key={roleType}
            onClick={() =>
              handleEditRole({ id: params.row._id, roleType })
            }
          >
           {icon}
           <Typography ml={1}>{roleType}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EditRoleBtn;
