import { Box } from "@mui/material";

// components
import Header from "../components/Header";
import BarChart from "../components/BarChart";

const Bar = () => {
  return (
    <Box ml="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
