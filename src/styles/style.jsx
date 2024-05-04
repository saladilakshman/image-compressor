import * as colors from "@mui/material/colors";
export const styles = {
    App_logo: {
        background: `linear-gradient(  34deg, orange,rgb(255, 171, 185),rgb(93, 93, 249))`,
        backgroundClip: "text",
        color: "transparent",
    },
    App_info: {
        padding: 2,
        color: colors.deepOrange[300],
    },
    Accordion: {
        width: { xs: "100%", lg: "70%" },
        display: "block",
        margin: "auto",
        backgroundColor: colors.green[400],
    },
    tips: {
        color: "white",
        //fontWeight: 300,
    },
    divider: {
        backgroundColor: "white",
        m: 0.8,
    },
    tip_text: {
        color: "white",
        p: 1,
    },
    image_component: {
        width: { xs: '100%', lg: 400 },
        height: { xs: 250, lg: 350 },
        borderRadius: 2,
        backgroundColor: colors.cyan[50],
    },
    file_image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 2,
    },
    flex: {
        whiteSpace: "nowrap",
        dispaly: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    compress_button: {
        display: "block",
        margin: "auto",
        marginBlockStart: 5,
    },
    stack: {
        position: 'absolute',
        top: 3,
        right: -45,
    },
    iconbutton: {
        backgroundColor: colors.green[400],
        color: colors.common.white,
        '&:hover': {
            backgroundColor: colors.green[400]
        }
    },
    clearbutton: {
        backgroundColor: colors.red[500],
        '&:hover': {
            backgroundColor: colors.red[500]
        }
    }
};
