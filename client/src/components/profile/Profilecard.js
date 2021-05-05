import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import MOdal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import './profile.css'

class Profilecard extends React.Component {
  
 
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      dob: props.data.dob,
      balance: props.data.balance,
      email:props.data.email,
      mobile:props.data.mobile,
      addbalance:""
    };
  }
  


  addBalance = async() =>{

    let B = parseInt(this.state.addbalance) + parseInt(this.state.balance);
    let url = 'http://localhost:5000/auth/addbalance'+'?amount='+this.state.addbalance; 
    axios.get(url)
            .then(response => {
                if(response.data === 'Added Balance.'){
                  toast.success("Added Balance.");
                  this.setState({balance:B})
                }
                else{
                  toast.error(response.data);
              }
            console.log(response);
            })
            .catch(err => console.log(err))
      this.setState({addbalance:0})
  }
  

  componentDidMount(){
    this._isMounted = true;
  }

  
  componentWillUnmount(){
    
    window.location.reload();
    
  }
  
  render() {

    return (
      
      <div>
      <center>
      <div class="card">
      <h1 class="title">First Name :{this.state.firstname}</h1>
      <h1 class="title">Last  Name :{this.state.lastname}</h1>
                  <p class="title">Email Address : {this.state.email}</p>
                  
                  <p>Contact Number :{this.state.mobile}</p>
                  
                  <p>Balance : {this.state.balance}/- Rs</p>
                  <p>Enter Amount :</p>
                  <input type="number" min="1" value={this.state.addbalance} onChange={event => this.setState({addbalance: event.target.value.replace(/\D/,'')})}/>
                  <button  onClick={this.addBalance}>
                  Add Balance
                  </button>  
      </div>
      </center>
      
      
      
         
      </div>
    );
  }
}

export default Profilecard;