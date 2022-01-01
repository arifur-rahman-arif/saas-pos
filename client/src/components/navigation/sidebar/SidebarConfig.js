// ----------------------------------------------------------------------

const styleObject = {
    fontSize: "1.1rem",
};

const sidebarConfig = [
    {
        title: "dashboard",
        path: "/dashboard",
        icon: <i className="fas fa-chart-pie" style={styleObject}></i>,
    },
    {
        title: "users",
        path: "/dashboard/user",
        icon: <i className="fas fa-users" style={styleObject}></i>,
    },
    {
        title: "products",
        path: "/dashboard/products",
        icon: <i className="fas fa-shopping-bag" style={styleObject}></i>,
    },
    {
        title: "blogs",
        path: "/dashboard/blog",
        icon: <i className="fas fa-blog" style={styleObject}></i>,
    },
];

export default sidebarConfig;
