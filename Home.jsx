import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
      });
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => {
        alert("Blog deleted");
        fetchData(); // refresh list
      })
      .catch((err) => {
        console.error("Failed to delete blog:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ maxWidth: 345, m: "auto" }}>
              <CardMedia
                component="img"
                height="180"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {blog.category}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-around", pb: 2 }}>
                <Button variant="outlined" color="error" onClick={() => deleteBlog(blog._id)}>
                  DELETE
                </Button>
                <Button variant="outlined" color="primary">
                  UPDATE
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
