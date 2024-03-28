const AllAPIRouteMapping = {
    users: {
        add: {
            apiPath: "/api/auth/user",
            method: "POST"
        },
        verify: {
            apiPath: "/api/auth/verification",
            method: "POST"
        }
    },
    mails: {
        send: {
            apiPath: "/api/resend",
            method: "POST"
        }
    }
}

export default AllAPIRouteMapping;  