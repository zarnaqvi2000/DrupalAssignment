import axios from "axios";
import { useEffect, useState } from "react";

function Step4({ array }) {
  console.log(array, "I am from Step 4");
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    // Convert the 'array' to a JSON object
    const requestData = { data: array }; // You can structure the data as needed

    // Send the 'array' in the request body using a POST request
    axios
      .get("http://localhost:8080/custom-pdf-api", requestData)
      .then((response) => {
        // Assuming the response contains the PDF data
        setPdfData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  }, [array]);

  return (
    <div>
      {/* Display the PDF if available */}
      {pdfData && (
        <embed
          src={`data:application/pdf;base64,${pdfData}`}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
}

export default Step4;
