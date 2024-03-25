const AllAPIRouteMapping = {
    users: {
        add: {
            apiPath: "/api/user",
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