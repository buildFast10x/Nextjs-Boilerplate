const AllAPIRouteMapping = {
    users: {
        add: {
            apiPath: "/api/user",
            method: "POST"
        },
        login: {
            apiPath: "/api/auth",
            method: "POST"
        }
    },

    auth: {
        me: {
            apiPath: "/api/me",
            method: "GET"
        }
    }
}

export default AllAPIRouteMapping;