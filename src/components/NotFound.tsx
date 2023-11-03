import { Link } from "react-router-dom";

export const NotFound = () => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: 'red',
    };
  
    return (
      <>
      <div style={style}>
        <Link to="/">⬅️ Back to all rooms</Link>
        <h1>404 - Not Found</h1>
      </div>
      </>
    );
  };