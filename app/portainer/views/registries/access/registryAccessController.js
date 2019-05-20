angular.module('portainer.app')
.controller('RegistryAccessController', ['$scope', '$state', '$transition$', 'RegistryService', 'Notifications',
function ($scope, $state, $transition$, RegistryService, Notifications) {

  $scope.updateAccess = function(userAccessPolicies, teamAccessPolicies) {
    RegistryService.updateAccess($transition$.params().id, userAccessPolicies, teamAccessPolicies)
    .then(() => {
      Notifications.success("Accesses successfully updated");
      $state.reload();
    })
    .catch((err) => Notifications.error("Failure", err, "Unable to update accesses"));
  };

  function initView() {
    RegistryService.registry($transition$.params().id)
    .then(function success(data) {
      $scope.registry = data;
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to retrieve registry details');
    });
  }

  initView();
}]);
