const AllAPIRouteMapping = {
    users: {
        add: {
            apiPath: "/api/auth/user",
            method: "POST"
        },
        verify: {
            apiPath: "/api/auth/verification",
            method: "POST"
        },
        resetPasswordMail: {
            apiPath: "/api/auth/reset",
            method: "POST"
        },
        updatePassword: {
            apiPath: "/api/auth/new-password",
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