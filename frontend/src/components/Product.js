import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Rating from "./Rating";
import RatingforCard from "./RatingforCard";

function Product({ product }) {
  return (
    <Paper sx={{ maxWidth: 345, margin: "5px" }}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", maxHeight: 140 }}
          image={product.image}
          alt={product.name}
        />
        <CardContent style={{textAlign:"center" }}>
          <Typography gutterBottom variant="subheading2" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display:'flex',flexDirection:"column", alignItems:'center',marginLeft:"25px" }} component="div">
          -by {product.author}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{display:'flex',flexDirection:"column", alignItems:'center' }} component="div">
            <RatingforCard
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f8e825"
            />
          </Typography>
          <Typography variant="subheading1" component="div">
            ₹{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;
