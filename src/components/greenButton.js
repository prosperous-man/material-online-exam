import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";

export default withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);