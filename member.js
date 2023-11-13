function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/member.html',
        scope: {
        info: '='
        },
        controller: function($scope) {
        $scope.member = {};
        $scope.member.name = $scope.info.name;
        $scope.member.skills = $scope.info.skills;
        $scope.member.bio = $scope.info.bio;
        }
    };
}
