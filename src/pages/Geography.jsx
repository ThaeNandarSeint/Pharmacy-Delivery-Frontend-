import { Box, useTheme } from "@mui/material";
import GeographyChart from "../components/GeographyChart";

import { tokens } from "../utils/theme";

// components
import Header from "../components/Header";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box ml="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
