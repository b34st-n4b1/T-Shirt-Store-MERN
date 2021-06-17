import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home"
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes"
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

const Routes = () => {
    return(
        
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/cart" exact component={Cart} />
            <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}  />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}  />
            <AdminRoute path="/admin/create/category" exact component={AddCategory}  />
            <AdminRoute path="/admin/create/product" exact component={AddProduct}  />
            <AdminRoute path="/admin/categories" exact component={ManageCategories}  />
            <AdminRoute path="/admin/create/product" exact component={AddProduct}  />
            <AdminRoute path="/admin/products" exact component={ManageProducts}  />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}  />
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}  />

        </Switch>
    </BrowserRouter>
    )
}

export default Routes;