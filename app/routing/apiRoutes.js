var friendsList = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function(req, res) {
        var userScore = req.body.scores.map(function(score) {
            return parseInt(score);
        });

        var scoreArray = [];

        for (var i = 0; i < friendsList.length; i++) {
            var scoreDifference = 0;

            for (var j = 0; j < userScore.length; j++) {

                scoreDifference += Math.abs(parseInt(friendsList[i].scores[j]) - (userScore[j]));
            }

            scoreArray.push(scoreDifference);
        }
        var smallestIndex = 0;


        for (var i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] <= scoreArray[smallestIndex]) {
                smallestIndex = i;
            }
        }

        var bestMatch = friendsList[smallestIndex];
        friendsList.push(req.body);
        res.json(bestMatch);
        res.redirect("/");

    });

};