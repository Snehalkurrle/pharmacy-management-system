const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        console.log("Allowed Roles:", roles);
        console.log("Logged In User Role:", req.user.role);

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission."
            });

        }

        next();

    };

};

module.exports = authorizeRoles;