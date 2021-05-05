import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Mystockcard from '../stock/Mystockcard'

import { useState, useEffect } from "react";
import Profilecard from './Profilecard';

function Myprofile(){
        const [userData,setUserData]=useState([]);
        useEffect(()=>{
          axios.get('http://localhost:5000/auth/myprofile')
          .then(res=>{
            console.log(res.data);
            setUserData(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
        },[])
        
        const users = userData.map((data,id)=>{
          return <div key={id}>
            <Profilecard data={data}/>
          </div>
        })
        
        return(
          <>
          <center>
          {users}
          </center>
          
          </>           
        );
}
export default Myprofile;