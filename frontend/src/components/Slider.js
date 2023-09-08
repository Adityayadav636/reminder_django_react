import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Checkbox, FormGroup } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
    position: "relative",
  },
}));

function Filters({ price, category, categories, rating, onFilterChange }) {
  const classes = useStyles();

  // adding price filter
  const handlePriceChange = (event) => {
    const selectedPriceRange = event.target.value;
    let priceRange = [0, 0];

    if (selectedPriceRange === "0-200") {
      priceRange = [0, 200];
    } else if (selectedPriceRange === "200-500") {
      priceRange = [200, 500];
    } else if (selectedPriceRange === "500-2000") {
      priceRange = [500, 2000];
    } else if (selectedPriceRange === "2000-above") {
      priceRange = [2000, 10000];
    }   else {
      priceRange = [0, 10000];
    }
    console.log(priceRange)
    onFilterChange({ price: priceRange, category, rating });
  };

  // adding category filter 
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      onFilterChange({ price, category: "", rating });
    } else {
      onFilterChange({ price, category: selectedCategory, rating });
    }
    console.log(selectedCategory)
  };
  // adding rating filter 
  const handleRatingChange = (event) => {
    const selectedRating = event.target.value;
    if (selectedRating === "") {
      onFilterChange({ price, category, rating: "" });
    } else {
      onFilterChange({ price, category, rating: selectedRating });
    }
  };

  return (
    <Grid className={classes.root} container alignItems="center">
      <Grid item xs={12} sm={3} style={{display:"flex",justifyContent:'center', alignItems:"center" }}>
        <div>
          <h4 style={{ marginLeft: "20px" }}>Price</h4>
          <RadioGroup value={price[0] + "-" + price[1]} onChange={handlePriceChange}>
            <FormControlLabel
              value="0-200"
              control={<Radio color="default" />}
              label="Rs 0 - Rs 200"
            />
            <FormControlLabel
              value="200-500"
              control={<Radio color="default" />}
              label="Rs 200 - Rs 500"
            />
            <FormControlLabel
              value="500-2000"
              control={<Radio color="default" />}
              label="Rs 500 - Rs 2000"
            />
            <FormControlLabel
              value="2000-above"
              control={<Radio color="default" />}
              label="Rs 2000 and above"
            />
            <FormControlLabel
              value="all"
              control={<Radio color="default" />}
              label="All"
            />
          </RadioGroup>
        </div>
      </Grid>
      <Grid item xs={12} sm={3} style={{display:"flex",justifyContent:'center', alignItems:"center" }}>
        <div>
          <h4>Category</h4>
          <RadioGroup value={category} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                value={category}
                control={<Radio color="default" />}
                label={category}
              />
            ))}
            <FormControlLabel
              value="all"
              control={<Radio color="default" />}
              label="All"
            />
          </RadioGroup>
        </div>
      </Grid>
      <Grid item xs={12} sm={3} style={{display:"flex",justifyContent:'center', alignItems:"center" }}>
        <div>
          <h4  >Rating</h4>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rating === "5.00"}
                  onChange={handleRatingChange}
                  color="default"
                />
              }
              label="5 star"
              value="5.00"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rating === "4.00"}
                  onChange={handleRatingChange}
                  color="default"
                />
              }
              label="4 star"
              value="4.00"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rating === "3.00"}
                  onChange={handleRatingChange}
                  color="default"
                />
              }
              label="3 star"
              value="3.00"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rating === "2.00"}
                  onChange={handleRatingChange}
                  color="default"
                />
              }
              label="2 star"
              value="2.00"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rating === "1.00"}
                  onChange={handleRatingChange}
                  color="default"
                />
              }
              label="1 star"
              value="1.00"
            />
        
            <FormControlLabel
              control={
                <Checkbox
                  checked={rating === ""} // Represents the "All" option
                  onChange={handleRatingChange}
                  color="default"
                />
              }
              label="All"
              value=""
            />
          </FormGroup>
        </div>
      </Grid>
    </Grid>
  );
}

export default Filters;
