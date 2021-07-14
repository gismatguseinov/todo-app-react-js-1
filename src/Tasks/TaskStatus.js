import { Steps } from "antd";
import React from "react";
const { Step } = Steps;

const  TaskStatus =(props) => {

  // onChange = (current) => {
  //   console.log("onChange:", current);
  //   this.setState({ current });
  // };

    // const { current } = this.state;
    
  return (
    <>
      <Steps size="small" responsive={true} current={props.status} direction="horizontal">
        <Step title="Start" />
        <Step title="In Progress" />
        <Step title="Waiting" />
        <Step title="Done" />
      </Steps>
    </>
  );
}
  

export default TaskStatus;
