import "./Card.css";

function Card(props) {
  return (
    // <div className="mainDiv">
    <div className="card-div">
      <h1
        style={{
          margin: "10px auto",
          color: "#975f5f",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Movie Name : {props.name}
      </h1>
      <h3
        style={{
          margin: "10px auto",
          color: "rgb(68 35 35)",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Category : {props.category}
      </h3>
      <h4
        style={{
          margin: "10px auto",
          color: "rgb(167 57 57)",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Ticket Cost : {props.cost}
      </h4>
      <h4
        style={{
          margin: "10px auto",
          color: "rgb(54 31 31)",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Total Seats in theatre : {props.total}
      </h4>
      <h4
        style={{
          margin: "10px auto",
          color: "rgb(114 26 26)",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        Total Occupied in theatre : {props.occupied}
      </h4>
    </div>
    // </div>
  );
}

export default Card;
