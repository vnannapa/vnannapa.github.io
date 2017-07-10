/**
 * AngularJS code
 */

var twitter = angular.module('app', []);
twitter.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

});

/* function to read the twitter JSON and display the tweets of the users
* */
twitter.controller('mainController', function ($scope, $http) {
    $scope.placeholder="Compose new Tweet";
    $http.get('twitter.json').success(function (response) {
        $scope.data = response.users[0];
        $scope.id = 0;
        $scope.switch_account= function () {
            if($scope.id == 0){
                $scope.data = response.users[1];
                $scope.id = 1
            }else{
                $scope.data = response.users[0];
                $scope.id = 0
            }

        };
        /* function to compose new tweet and store it in the scope to
        add it to the top of the tweets list.
        * */

        $scope.create_tweet = function () {
            var tweets = $scope.data.tweets;
            $scope.date = new Date();
          var tweet = {
					"text": $scope.tweet.text,
                    "date": $scope.date,
					"entities": {
						"user_mentions": [
							{
								"screen_name": $scope.data.user.screen_name ,
								"name": $scope.data.user.name,
								"profile_pic": $scope.data.user.profile_image_url
							}
						]
					}
				};

          $scope.data.tweets = $scope.data.tweets.concat(tweet);
          $scope.data.tweets[1].entities.user_mentions[0].name = $scope.data.user.name;
          $scope.data.tweets[1].entities.user_mentions[0].screen_name = $scope.data.user.screen_name;
          $scope.data.tweets[1].entities.user_mentions[0].profile_pic = $scope.data.user.profile_image_url;
          $scope.tweet.text = "";
        };
    });
});
