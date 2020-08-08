import React, { Component,cloneElement } from "react";
import { getMethod } from "../../api/services";
// , fetchData

class Fetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: []
    };
  }
  componentDidMount() {
    this.mounted = true
    this.fetchData(this.props.path);
  }
  componentWillUnmount(){
    this.mounted = false
  }
  
  fetchData = async path => {
    this.setState({
      loading: true
    });
    try {
      const response = await getMethod(path);
      if(this.mounted){
        this.setState({
          data: response.data,
          loading: false
        });
      }
      
    } catch (error) {
      this.setState({
        error: error,
        loading: false
      });
    }
  };

  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return cloneElement(child, {
        data: this.state.data,
        error: this.state.error,
        //loading: this.state.loading
      });
    });
    
    return childWithProp;
  }
}

export default Fetcher;
