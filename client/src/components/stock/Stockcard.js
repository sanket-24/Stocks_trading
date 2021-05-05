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
import './Stockcard.css'


class Stockcard extends React.Component {
  
 
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      stock: props.name,
      price: "-",
      currency: "INR",
      quantity: "0"
      
    };
    this.interval = window.setInterval( async() => {
      if(this._isMounted){
        let url = 'http://localhost:5000/stock/price'+'?stock='+this.state.stock;
          axios.get(url)
            .then(response => {
              console.log(response);
              this.setState({price: response.data.price,currency:response.data.currency});
          })
          .catch(err => console.log(err))    
        
      }
    }, 500);
  }
  
  

  componentDidMount(){
    this._isMounted = true;
  }


  
    
    
  


  buyStock = async() =>{
    var quantity = this.state.quantity;
    if(this.state.quantity != '0'){
      if(this.state.price != '-'){
        let url = 'http://localhost:5000/stock/buy'+'?stock='+this.state.stock+'&quantity='+this.state.quantity+'&price='+this.state.price;
        axios.get(url)
            .then(response => {
                if(response.data === 'Order placed.'){
                  toast.success("Order placed for Buying "+quantity+" shares of "+this.state.stock);
                }
                else if(response.data === 'Low Balance !!'){
                  toast.error("Low Balance !!");
                }
                else{
                  toast.error(response.data);
              }
            console.log(response);
            })
            .catch(err => console.log(err))

      }
      else{
        toast.success("Wait prices are updating");
      }
    }
    else{
      toast.success("Enter non-zero Quantity");
    }

    this.setState({quantity:0});
    
    
  }
  componentWillUnmount(){
    this._isMounted = false;
    window.clearTimeout(this.interval);
    console.log("unmount "+this.state.stock);
    window.location.reload();
    //alert("The component named Header is about to be unmounted.");
  }
  
  render() {

    return (
      
      <div>

      <div class="card">
        <h2>Stock Name :{this.state.stock}</h2>
       
          <table>
            
            <tr>
              <td>
              <p>Current Price</p><p>{this.state.price}</p>
              </td>
              <td>
              <div align="left">currency : {this.state.currency}</div>
              </td>
            </tr>
            <tr>
              <td>
              <h3>Quantity : {parseInt(this.state.quantity)}</h3>
              <input type="number" value={this.state.quantity} onChange={event => this.setState({quantity: event.target.value.replace(/\D/,'')})}/>
              </td>
              <td>
              <span>Final Amount = </span>{Math.imul(this.state.quantity,this.state.price)}
              </td>
            </tr>
          </table>
          
          
          <Button class="btn" onClick={this.buyStock}>
          Buy  
          </Button>  
      </div>
      </div>
    );
  }
}

export default Stockcard;