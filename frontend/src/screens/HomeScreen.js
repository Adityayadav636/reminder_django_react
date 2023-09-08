// import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import Product from "../components/Product";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import ProductCarousel from "../components/ProductCarousel";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductList } from "../redux/slices/productSlice";
// import Filters from "../components/Slider";
// import StarPurple500Icon from '@mui/icons-material/StarPurple500';
// function HomeScreen({ history }) {
//   const dispatch = useDispatch();

//   // Get the product list from the Redux store
//   const productList = useSelector((state) => state.product.productList);

//   const [showFilters, setShowFilters] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState({
//     price: [0, 3000],
//     category: "",
//     rating: "",
//   });

//   const { products, loading, error, page, pages } = productList;
//   const { pageNumber } = useParams();
//   let keyword = history.location.search;

//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Fetch the product list when the component mounts or the keyword/parameters change
//   useEffect(() => {
//     dispatch(fetchProductList(keyword, pageNumber));
//   }, [dispatch, keyword, pageNumber]);

//   // Set the selected category from localStorage when the keyword changes
//   useEffect(() => {
//     const storedCategory = localStorage.getItem("selectedCategory");

//     if (storedCategory) {
//       setSelectedCategory(storedCategory);
//     } else {
//       setSelectedCategory(null);
//     }
//   }, [keyword]);

//   // Update the filtered products based on selected filters
//   useEffect(() => {
//     let filteredProducts = products;

//     // Filter by category
//     if (selectedFilters.category && selectedFilters.category !== "all") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.category === selectedFilters.category
//       );
//     }

//     // Filter by rating
//     if (selectedFilters.rating && selectedFilters.rating !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.rating === selectedFilters.rating
//       );
//     }

//     // Filter by price range
//     filteredProducts = filteredProducts.filter(
//       (product) =>
//         product.price >= selectedFilters.price[0] &&
//         product.price <= selectedFilters.price[1]
//     );

//     setFilteredProducts(filteredProducts);
//   }, [selectedFilters, products]);

//   // Handle category click event
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       category: category,
//     }));
//     localStorage.setItem("selectedCategory", category);
//   };

//   // Handle latest products click event
//   const handleLatestProductsClick = () => {
//     setSelectedCategory(null);
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       category: "",
//     }));
//     localStorage.removeItem("selectedCategory");
//   };

//   // Handle filter change event
//   const handleFilterChange = (filters) => {
//     setSelectedFilters(filters);
//   };

//   // Extract unique categories from the product data
//   const categories = [...new Set(products.map((product) => product.category))];

//   return (
//     <div>
//       {showFilters ? (
//         // Show the filters component if showFilters is true
//         <Filters
//           price={selectedFilters.price}
//           category={selectedFilters.category}
//           categories={categories}
//           rating={selectedFilters.rating}
//           onFilterChange={handleFilterChange}
//           products={products}
//         />
//       ) : (
//         // Show the apply filters section if showFilters is false
//         <>
//           <div
//             style={{
//               marginLeft: "8px",
//               borderRadius: "4px",
//               fontWeight: "bold",
//               display: "flex",
//               justifyContent: "flex-end",
//               cursor: "pointer",
//             }}
//             onClick={() => setShowFilters(true)}
//           >
//             <div style={{ marginTop: "5px" }}>Apply filters</div>
//             <div>
//               <iframe
//                 src="https://giphy.com/embed/3ohhwuZW3cEWzJehhu"
//                 width="40"
//                 height="40"
//                 className="giphy-embed"
//                 allowFullScreen
//                 style={{ pointerEvents: "none" }}
//               ></iframe>
//             </div>
//           </div>
//           {!keyword && !showFilters && (
//             // Hide ProductCarousel when showFilters is true
//             <div style={{ marginTop: "-30px" }}>
//               <div
//                 style={{
//                   padding: "8px",
//                   marginRight: "8px",
//                   marginBottom: "8px",
//                   borderRadius: "4px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 TOP-RATED PRODUCTS
//               </div>
//               <ProductCarousel />
//             </div>
//           )}
//         </>
//       )}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           marginTop: "30px",
//         }}
//       >
//         <div
//           style={{
//             padding: "8px",
//             marginRight: "8px",
//             marginBottom: "8px",
//             borderRadius: "4px",
//             border: selectedCategory === null ? "1px solid #ccc" : "none",
//             fontWeight: selectedCategory === null ? "bold" : "normal",
//             cursor: "pointer",
//           }}
//           onClick={handleLatestProductsClick}
//         >
//           Latest Products
//         </div>
//         <div style={{ display: "flex", flexDirection: "row", marginLeft: "15px" }}>
//           {categories.map((category) => (
//             <div
//               style={{
//                 padding: "8px",
//                 marginRight: "8px",
//                 marginBottom: "8px",
//                 border: selectedCategory === category ? "1px solid #ccc" : "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontWeight: selectedCategory === category ? "bold" : "normal",
//               }}
//               key={category}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category}
//             </div>
//           ))}
//         </div>
//       </div>
//       {loading ? (
//         // Show loader while products are being fetched
//         <Loader />
//       ) : error ? (
//         // Show error message if there's an error
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div>
//           <Row>
//             {filteredProducts.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomeScreen;
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

import React from 'react';
import { Button, Typography, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
  },
  paper: {
      padding: theme.spacing(2),
  },
  button: {
      margin: theme.spacing(1),
  },
}));
function HomeScreen() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const userDetails = useSelector((state) => state.user.userDetails);

  const handleLogout = () => {
    dispatch(logout());
    console.log("hi")
    history.push("/");

    window.location.reload(); // Reload the page

  };
    return (
        <Container className={classes.container} maxWidth="md">
          <div style={ {display : "flex"}}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Reminder Application.
            </Typography>
            
            <Button variant="contained" color="secondary" onClick={handleLogout}  className={classes.button}>Log Out</Button>
            </div>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Today is Tuesday, 14th Of February.
            </Typography>

            <Paper className={classes.paper}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/setreminder">Set Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/modifyreminder">Modify Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/disablereminder">Disable Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/deletereminder">Delete Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/enablereminder">Enable Reminder</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.button} component={Link} to="/viewreminder">View your Reminders</Button>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default HomeScreen;
