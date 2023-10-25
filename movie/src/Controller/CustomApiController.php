<?php

namespace Drupal\movie\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller for the custom API endpoint.
 */
class CustomApiController extends ControllerBase
{
    /**
     * Callback function for the GET request.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     *   The current request.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     *   The JSON response.
     */
    public function getNodes(Request $request)
    {
        $content_type = 'movies'; // Default content type
        $query = \Drupal::entityQuery('node')
            ->condition('type', $content_type);
        // ->sort('created', 'DESC');
        $nids = $query->execute();

        $nodes = [];
        if (!empty($nids)) {
            foreach ($nids as $nid) {
                $node = \Drupal\node\Entity\Node::load($nid);
                // Customize the data you want to send.
                $nodes[] = [
                    'MovieName' => $node->get('field_movie_name')->value,
                    'TicketCost' => $node->get('field_cost')->value,
                    'MovieCategory' => $node->get('field_category_movie')->value,
                    'SeatsBooked' => $node->get('field_seats_booked')->value,
                    'TotalSeats' => $node->get('field_total_seats')->value,
                    // Add more fields as needed.
                ];
            }
        }

        // Get the query parameters for page and items per page
        $page = $request->query->get('page', 1);
        $itemsPerPage = $request->query->get('items_per_page', 10);

        // Calculate the offset based on the page number and items per page
        $offset = ($page - 1) * $itemsPerPage;

        // Slice the nodes array to get the current page of data
        $pagedNodes = array_slice($nodes, $offset, $itemsPerPage);

        return new JsonResponse($pagedNodes);
    }


    // /**
    //  * Callback function for the GET request.
    //  *
    //  * @return \Symfony\Component\HttpFoundation\JsonResponse
    //  *   The JSON response.
    //  */
    // public function getNodes()
    // {
    //     $content_type = 'movies'; // Default content type
    //     $query = \Drupal::entityQuery('node')
    //         ->condition('type', $content_type);
    //     // ->sort('created', 'DESC');
    //     $nids = $query->execute();

    //     $nodes = [];
    //     if (!empty($nids)) {
    //         foreach ($nids as $nid) {
    //             $node = \Drupal\node\Entity\Node::load($nid);
    //             // Customize the data you want to send.
    //             $nodes[] = [
    //                 'MovieName' => $node->get('field_movie_name')->value,
    //                 'TicketCost' => $node->get('field_cost')->value,
    //                 'MovieCategory' => $node->get('field_category_movie')->value,
    //                 'SeatsBooked' => $node->get('field_seats_booked')->value,
    //                 'TotalSeats' => $node->get('field_total_seats')->value,
    //                 // Add more fields as needed.
    //             ];
    //         }
    //     }

    //     return new JsonResponse($nodes);
    // }
    /**
     * Callback function for the GET request to retrieve nodes of a specific category.
     *
     * @param string $category
     *   The category to filter nodes.
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     *   The JSON response.
     */
    public function getNodesByCategory($category)
    {
        $content_type = 'movies'; // Default content type

        $query = \Drupal::entityQuery('node')
            ->condition('type', $content_type)
            ->condition('field_category_movie', $category); // Change the field name to match your category field.
        $nids = $query->execute();

        $nodes = [];
        if (!empty($nids)) {
            foreach ($nids as $nid) {
                $node = \Drupal\node\Entity\Node::load($nid);
                // Customize the data you want to send.
                $nodes[] = [
                    'MovieName' => $node->get('field_movie_name')->value,
                    'TicketCost' => $node->get('field_cost')->value,
                    'MovieCategory' => $node->get('field_category_movie')->value,
                    'SeatsBooked' => $node->get('field_seats_booked')->value,
                    'TotalSeats' => $node->get('field_total_seats')->value,
                    // Add more fields as needed.
                ];
            }
        }

        return new JsonResponse($nodes);
    }
}
