'use strict';


import React from 'react';
import ReactMarkdown from 'react-markdown';
import Highlight from 'react-highlight';
import {Link} from 'react-router';
import SmartHeading from '../smart-heading';

let SmartPre = (props) => {
  return <Highlight className={`language-${props.language}`}>
    { props.literal }
  </Highlight>
}; 

let SmartAnchor = (props) => {
  return <Link to={props.href}> {props.children} </Link>
}

let Displaybox = ({text}) => {
  return (
    <div className="displaybox">
      <ReactMarkdown source={text} renderers={
        {
          CodeBlock: SmartPre,
          Link: SmartAnchor,
          Heading: SmartHeading,
        }
      }/>
    </div>
  );
}

export default Displaybox;

