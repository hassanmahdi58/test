

import React from 'react';

const Navbar = props => ( 
  <div className="pos-f-t">      
    <div className=" navbar-dark bg-inverse">
      <span className="navbar-brand bg-primary d-flex">iTunes</span>
      <form 
        onSubmit={ev => {ev.preventDefault();props.onSubmit();}} 
        className="form-inline pull-xs-left"
      >
          <input 
            ref={props.saveRef}
            defaultValue={props.query} 
            className="form-control" 
            type="text" 
            placeholder="Search Terms" 
          />
          &nbsp;
          <button className="btn btn-outline-success outline-success" type="submit">Submit</button>
          
      </form>
    </div>
  </div>
);




export default Navbar;