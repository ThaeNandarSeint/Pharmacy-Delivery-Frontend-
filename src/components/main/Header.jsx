import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return (
        <Box mb='20px'>
            <Typography variant="h2" color={colors.grey[100]} fontWeight='bold' sx={{ mb: "5px", textTransform: 'uppercase' }}>{title}</Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>{subtitle}</Typography>
        </Box>
    )
}

export default Header