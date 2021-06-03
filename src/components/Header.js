import React, { useContext, useState } from "react";
import dig from "object-dig"
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  button: {
    color: '#FFF',
  }
}));

const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  // もしログインしていたら
  const classes = useStyles();
  const buttonRender = () => {
    let buttonDom
    if( dig(currentUser, 'currentUser', 'uid') ){
    // if( currentUser.currentUser ){
      // ↑は中身が存在しません！というエラーになってしまいます
      // currentUser.currentUser.Im.〇〇
      buttonDom = <Button className={classes.button} variant='inherit' onClick={logOut}>ログアウト</Button>
    // もしログインしていなかったら
    }else{
      buttonDom = <Button className={classes.button} variant='inherit' onClick={signInWithGoogle}>ログイン</Button>
    }
    return buttonDom
  }
  return(
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          ReactToDo
        </Typography>
        {buttonRender()}
      </Toolbar>
    </AppBar>
  )
}
export default Header;