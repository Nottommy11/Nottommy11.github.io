import React from 'react';
import ReactDOM from 'react-dom/client';
import Form from './form.js';
import HelpSheet from './helpSheet.js';
import ViewTicket from './viewTickets.js';
import './index.css';

class Page extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            site: 0,
            ticketsNum: 432569,
            tickets: [
                {
                  ticketsid: "#432568",
                  firstName: 'Mark',
                  lastName:'Markus',
                  furbyName:'Marthalamule',
                  furbyIssue:'Ate my chair, plants, and dog'
                }

            ],
        };
        this.addToState = this.addToState.bind(this)
    }
    changeSite(toSite){
        this.setState({site:toSite})
    }
    addToState(ticketInfo){
        this.setState({ticketsNum:this.state.ticketsNum+1})
        let temp = this.state.tickets
        temp.push(ticketInfo)
        this.setState({tickets: temp})
    }
    render(){
        console.log(this.state.tickets)
        return(
            <div>
                {//window.location.href=="http://localhost:3000/form.html" ? <h1>Stuff And Things</h1> : <h1>Working!</h1>
                }
                <div id="container">
                    <div id="header">
                        <h1> Welcome to the Furby Help Desk</h1>
                        <nav>
                            <ul>
                                <li><a onClick={() => this.changeSite(0)}>Home</a></li>
                                <li><a onClick={() => this.changeSite(1)}>Help Sheet</a></li>
                                <li><a onClick={() => this.changeSite(2)}>Submit a Form</a></li>
                                <li><a onClick={() => this.changeSite(3)}>View Tickets</a></li>
                            </ul>
                        </nav>
                    </div>

                    {this.state.site==0 &&
                    <div id='container2'>
                        <div id="main">
                            <p> Furby at first was called "Furball" because it appeared to be a cute furball.
                                Though over time the name Furby caught on over time. It is an electronic robotic toy
                                that was created in America. Tiger Electronics created the Furby design and released
                                it in 1998. Furby was a big hit when it was first launced and continued to be a big deal
                                till 2000. Hasbro then started selling Furby until 2018. Furby was able to speak 24
                                different languages. Which is what got the toy banned from the United States. It was
                                banned by National Security Agency in the U.S. Though to this day you can still find
                                a Furby on the market. Buy it at your own risk because it has a mind of its own.</p>
                            <img src={require("./images/furbyTwo.jpg")} alt="picture of furby"/>

                        </div>

                        <div id="sidebar">
                            <img src={require("./images/furbyFriend.webp")} alt="picture of furby"/>
                        </div>
                    </div>}
                    {this.state.site==1 && <HelpSheet></HelpSheet>}
                    {this.state.site==2 && <Form pushTicket={this.addToState} ticketId={this.state.ticketsNum}></Form>}
                    {this.state.site==3 && <ViewTicket allTickets={this.state.tickets}></ViewTicket> }

                    <div id="footer">
                        <p>Contact Us:</p> 
                        <p> (800) 123-4567</p>
                        <p>help@furbydesk.com</p>
                        
                        <p> Furby Help Page 2022</p> 
                    </div>
                </div>

            </div>
        )
    }
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);