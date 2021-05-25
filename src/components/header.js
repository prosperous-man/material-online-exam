import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles(theme => ({
    root: {
        height: 80,
        background: "#393939",
        padding: "0px 10px",
        color: "white"
    }
}))

export default function Header() {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <img src={"https://images.squarespace-cdn.com/content/v1/5919c67c9de4bb3c019b413f/1537449375915-6698LAF75SSHHG9O4X3L/ke17ZwdGBToddI8pDm48kB5BMYSvpRNLARkreFB4aEMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcYVC8j-ZV9Ee2cOUnC8Xc1XNyJFHhYg6jJCK-XG0ZNJ-ClJCRxoy8N6ymJGbXdTx6/LOGO-web+site+-ppfg_wh_round.png?format=500w"}
                 style={{
                     height: 70,
                     marginTop: 5
                 }}/>
        </div>
    )
}