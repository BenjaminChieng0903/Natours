import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./myReview.css";
import { useEffect, useState } from "react";
import AxiosApi from "../../axiosApi/api";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "../store/user/user.selector";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const MyReivew = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const [reviews, setReviews] = useState(null);
  //   const convertDateFormat = () => {
  //     const dateObject = new Date(review.createdAt);
  //     const options = { year: "numeric", month: "short", timeZone: "UTC" };
  //     const formattedDate = dateObject.toLocaleString("en-AU", options);
  //     console.log(formattedDate);
  //     return formattedDate;
  //   };
  useEffect(() => {
    async function getReviews() {
      await AxiosApi.get(`/reviews/user/${currentUser._id}`).then((res) => {
        console.log(res.data.data.reviews);
        setReviews(res.data.data.reviews);
      });
    }
    getReviews();
  }, []);
  return (
    <div className="MyReview">
      <Box
        sx={{
          width: "80%",
          marginTop: "2rem",
        }}
      >
        {/* <Stack spacing={3} sx={{ width: "100%" }}>
          {reviews ? (
            reviews.map((review) => {
              return <Item>Item 1</Item>;
            })
          ) : (
            <h1>No review</h1>
          )}
        </Stack> */}
        {reviews ? (
          reviews.map((review) => {
            const dateObject = new Date(review.createdAt);
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            };
            const formattedDate = dateObject.toLocaleString("en-AU", options);
            console.log(formattedDate);

            return (
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: "100%",
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  marginTop: "1rem",
                }}
              >
                <Grid container spacing={10}>
                  <Grid item>
                    <ButtonBase sx={{ width: 256, height: 256 }}>
                      <Img
                        sx={{ width: 256, height: 256 }}
                        alt="imageCover"
                        src={`/img/tours/${review.tour.imageCover}`}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={20} sm container spacing={12}>
                    <Grid
                      item
                      xs
                      container
                      //   mt={1}
                      direction="column"
                      //   spacing={5}
                    >
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          fontSize="20px"
                          fontWeight="bold"
                        >
                          Tour information
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize="15px"
                          gutterBottom
                        >
                          Tour Name: {review.tour.name}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                          ID: 1030114
                        </Typography> */}
                        <Typography
                          mt={5}
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          fontSize="20px"
                          fontWeight="bold"
                        >
                          User information
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize="15px"
                          gutterBottom
                        >
                          Email: {review.user.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize="15px"
                          gutterBottom
                        >
                          User Name: {review.user.name}
                        </Typography>
                      </Grid>

                      {/* <Grid item>
                        <Typography sx={{ cursor: "pointer" }} variant="body2">
                          Remove
                        </Typography>
                      </Grid> */}
                    </Grid>
                    <Grid item>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        fontSize="20px"
                        fontWeight="bold"
                      >
                        Reviews information
                      </Typography>
                      <Typography variant="body2" fontSize="15px" gutterBottom>
                        Review: {review.review}
                      </Typography>
                      <Typography variant="body2" fontSize="15px" gutterBottom>
                        CreatedAt: {formattedDate}
                      </Typography>
                      <Typography variant="body2" fontSize="15px" gutterBottom>
                        Rating: {review.rating}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        fontSize="30px"
                        variant="subtitle1"
                        component="div"
                      >
                        ${review.tour.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        ) : (
          <h1>No reviews</h1>
        )}
      </Box>
    </div>
  );
};

export default MyReivew;
