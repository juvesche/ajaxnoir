<?php


namespace Noir;


class StarController extends Controller {
    /**
     * StarController constructor.
     * @param Site $site Site object
     * @param $user User object
     * @param array $post $_POST
     */
    public function __construct(Site $site, $user, $post) {
        $homeView = new HomeView($site, $user);
        parent::__construct($site);
        $movies = new Movies($site);
        if (isset($post['id'])){
            $id = strip_tags($post['id']);
            if (isset($post['rating'])){
                $rating = strip_tags($post['rating']);
                $worked = $movies->updateRating($user, $id, $rating);
                if($worked){
                    $this->result = json_encode(['ok' => true, 'message' => 'Updated database!', 'html' => $homeView->presentTable()]);
                }else{
                    $this->result = json_encode(['ok' => false, 'message' => 'Failed to update database!']);
                }


            }

        }



    }

}