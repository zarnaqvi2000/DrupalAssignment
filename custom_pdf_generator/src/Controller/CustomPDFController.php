<?php

namespace Drupal\custom_pdf_generator\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Dompdf\Dompdf;
use Dompdf\Options;

class CustomPDFController extends ControllerBase
{
    public function generatePdf(Request $request)
    {
        // Retrieve JSON data from the API request.
        $jsonData = $request->getContent();
        // Decode JSON data to an associative array.
        $data = json_decode($jsonData, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            // Handle JSON decoding error, if any.
            return new Response('Invalid JSON data', 400);
        }

        // Generate HTML from JSON data.
        $html = $this->jsonToHtml($data);

        // Create a new Dompdf instance.
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $dompdf = new Dompdf($options);

        // Load the HTML content.
        $dompdf->loadHtml($html);

        // Set paper size and orientation (A4 portrait).
        $dompdf->setPaper('A4', 'portrait');

        // Render the PDF.
        $dompdf->render();

        // Output the PDF as a response.
        $output = $dompdf->output();
        $response = new Response($output, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="custom.pdf"',
        ]);

        return $response;
    }

    // Convert JSON data to HTML.
    private function jsonToHtml($data)
    {
        $html = '<html><body>';
        foreach ($data as $key => $value) {
            $html .= "<p><strong>$key:</strong> $value</p>";
        }
        $html .= '</body></html>';
        return $html;
    }
}


// namespace Drupal\custom_pdf_generator\Controller;

// use Drupal\Core\Controller\ControllerBase;
// use Symfony\Component\HttpFoundation\Response;
// use Dompdf\Dompdf;
// use Dompdf\Options;
// use Symfony\Component\HttpFoundation\Request;

// class CustomPDFController extends ControllerBase
// {
//     public function generatePdf(Request $request)
//     {
//         // Get the JSON data from the request.
//         $jsonData = json_decode($request->getContent(), true);

//         // Process the JSON data (you can customize this part).
//         // For simplicity, let's assume we convert the array to a string.
//         $dataString = json_encode($jsonData);

//         // Generate a PDF using Dompdf.
//         $pdfData = $this->generatePdfFromData($dataString);

//         // Save the PDF to a file.
//         $pdfFilePath = $this->savePdfToFile($pdfData);

//         // Return the file location as a response.
//         $response = new Response($pdfFilePath);
//         $response->headers->set('Content-Type', 'text/plain'); // You can adjust the content type.

//         return $response;
//     }

//     private function generatePdfFromData($data)
//     {
//         // Create a new Dompdf instance.
//         $options = new Options();
//         $options->set('isHtml5ParserEnabled', true);
//         $dompdf = new Dompdf($options);

//         // Load the HTML content (in this case, we use the data as HTML).
//         $dompdf->loadHtml($data);

//         // Set paper size and orientation (A4 portrait).
//         $dompdf->setPaper('A4', 'portrait');

//         // Render the PDF.
//         $dompdf->render();

//         // Return the PDF content.
//         return $dompdf->output();
//     }

//     private function savePdfToFile($pdfData)
//     {
//         // Define the file path where you want to save the PDF.
//         $pdfFilePath = '/path/to/save/custom.pdf';

//         // Save the PDF content to the file.
//         file_put_contents($pdfFilePath, $pdfData);

//         // Return the file path.
//         return $pdfFilePath;
//     }
// }
