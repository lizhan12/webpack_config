import React from 'react';
import ReactDom from 'react-dom';
// import './index.less'
import './st.css'
class Hello extends React.Component {
  render () {
    return <div>hello world</div>
  }
}

ReactDom.render(
  <Hello></Hello>,
  document.getElementById('app')
)