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
    },

    stripe: {
        getProducts: {
            apiPath: '/api/stripe',
            method: 'GET'
        },
        checkoutProduct: {
            apiPath: '/api/stripe',
            method: 'POST'
        }
    }
}

export default AllAPIRouteMapping;