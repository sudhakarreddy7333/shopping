app.controller('loginCtrl',function($http,$location,$timeout,genService,$scope){
    var vm = this;
    vm.showErr = false;
    vm.showServerMesg = false;

    vm.postLogin = function(){
        $http.post('/api/Authenticate/LoginUser',vm.user).then(function(res){
            if(res.data.status === 'success'){
                $location.path('/employeesList');
                genService.setUsername(vm.user.username);
                $scope.$emit('usernameUpdated', genService.getUsername());
            }
            else if(res.data.status === 'error'){
                vm.showServerMesg = true;
                vm.serMsg = res.data.description;
                $timeout(function(){
                    vm.showServerMesg = false;
                },2000);
            }
        });
    };
});