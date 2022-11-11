import React,{Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { render } from '@testing-library/react';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'


class App extends Component{
    constructor(){
        super()
        this.state={
            robot:[],
            serachfield: ''
        }
    }

    componentDidMount(){

        fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json())
        .then(users=>
            this.setState({robot:users}));
      
    }

    onSearchChange=(event)=>{
   
            this.setState({serachfield: event.target.value})
    }

    render(){

            const {robot,serachfield}=this.state;
            const filteredRobots=robot.filter(robot =>{
                return robot.name.toLowerCase().includes(serachfield.toLowerCase())
            })
            return !robot.length?
             <h1>Loading</h1>:                        
           
        (
            <div className='tc'>
            <h1 className='f1'>Robo Friends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
            <ErrorBoundry>
            <CardList robot={filteredRobots}/>
            </ErrorBoundry>
            </Scroll>
            </div>
    );

    }
    }



export default App;