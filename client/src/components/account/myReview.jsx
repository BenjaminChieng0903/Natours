import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./myReview.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "1px solid #08a303",
  //   borderColor: "#08a303",
}));
const MyReivew = () => {
  return (
    <div className="MyReview">
      <Box
        sx={{
          width: "80%",
          marginTop: "2rem",
        }}
      >
        <Stack spacing={3} sx={{ width: "100%" }}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </Box>
    </div>
  );
};

export default MyReivew;
