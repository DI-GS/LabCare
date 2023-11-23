import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
    const expiresIn = 60 * 15;

    try {
        console.log("SI ENTRA AL GENERATE")
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        console.log(token)
        return { token, expiresIn };
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        console.log("SI ENTRA AL GENERATEREFRESH",uid)
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });
        console.log("ESte es el refrestoken",refreshToken)
        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: 'None',
    });
    console.log("SI HACE TODO")
    } catch (error) {
        console.log(error);
    }
};

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};
