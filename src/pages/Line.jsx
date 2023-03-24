import { Box } from "@mui/material";

// components
import Header from "../components/Header";
import LineChart from "../components/LineChart";

const Line = () => {
  return (
    <Box ml="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
