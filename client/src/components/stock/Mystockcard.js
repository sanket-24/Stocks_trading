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
import './Stockcard.css'
import { toast } from 'react-toastify';

class Mystockcard extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      stock: props.data.stock_name,
      price: "-",
      buyprice:props.data.Buying,
      quantity:props.data.quantity,
      onsell:0,
      currency: "INR"
    };
    this.interval = window.setInterval( async() => {
      if(this._isMounted){
        let url = 'http://localhost:5000/stock/price'+'?stock='+this.state.stock; axios.get(url)
            .then(response => {
              console.log(response);
              this.setState({price: response.data.price,currency:response.data.currency});
          })
          .catch(err => console.log(err))    
      }
    }, 15000);
  }
  componentDidMount(){
    this._isMounted = true;
  }

sellStock = async() =>{
    var quantity = this.state.onsell;
    if(this.state.onsell != '0'){
      if(this.state.price != '-'){
        let url = 'http://localhost:5000/stock/sell'+'?stock='+this.state.stock+'&onsell='+this.state.onsell+'&price='+this.state.price;
        axios.get(url)
            .then(response => {
                if(response.data === 'Order placed.'){
                  this.setState({quantity:this.state.quantity - quantity});
                  toast.success("Order placed for selling "+quantity+" shares of "+this.state.stock);
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

    this.setState({onsell:0});
    
        
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
        <h3>Quantity : {parseInt(this.state.quantity)}</h3>
          <table>
            <tr>
              <td>
              <p>Buy Price</p><p>{this.state.buyprice}</p>
              </td>
              <td>
              <p>Current Price</p><p>{this.state.price}</p>
              </td>
            </tr>
            <tr>
              <td>
              <div align="left">Current Profit = {parseInt((this.state.price - this.state.buyprice)*parseInt(this.state.quantity))}</div>
              </td>
              <td>
              <div align="left">currency : {this.state.currency}</div>
              </td>
            </tr>
            <tr>
              <td>
              <input type="number" min="1" max={this.state.quantity}  value={this.state.onsell} onChange={event => this.setState({onsell: event.target.value.replace(/\D/,'')})}/>
              </td>
              <td>
              <span>Final Returns = </span>{Math.imul(this.state.onsell,this.state.price)}
              </td>
              <td>
              <span>Final Interest = </span>{Math.imul(this.state.onsell,this.state.price - this.state.buyprice)}
              </td>
            </tr>
          </table>
          
          
          <Button size="small" class="btn" onClick={this.sellStock}>
          SELL
          </Button>
      </div>
      </div>
    );
  }
}

export default Mystockcard;