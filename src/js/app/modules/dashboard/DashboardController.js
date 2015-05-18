app.controller('DashboardController', function($scope, $location, DashboardService, ChartService){

  var mainChart, relationsChart;

  // update data when selected host has been changed
  $scope.$watch('selected', function(selectedHost, oldValue){
    if (selectedHost) {
      ChartService.getData(selectedHost.name).then(function(data){
        
        // set chart data
        mainChart.load(data);
        relationsChart.load(data);

        // calculate totals
        calculateTotals(data);
      });
      DashboardService.getData(selectedHost.name).then(function(returnobject){
        $scope.dataset = returnobject.data.errordata;
      });
    }
  });


  DashboardService.getHosts().then(function(returnobject){
    $scope.hosts = returnobject.data;
    if(returnobject.data && angular.isArray(returnobject.data)){
      $scope.selected = returnobject.data[0];
    }
  });

  // initialize main chart, data will be loaded later
  mainChart = c3.generate({
    bindto: '#mainChart',
    data: {
      columns: [],
      type: 'spline'
    },
    color: {
        pattern: ['#e67e22','#e74c3c','#3498db']
    },
    axis: {
      x: {
        type: 'categories',
        categories: ['1 March 2015','2 March 2015','3 March 2015','4 March 2015','5 March 2015','6 March 2015'] // TODO categories should come from the same call as the data...
      },
      y: {
        label: {
          text: 'Error Count',
          position: 'outer-middle'
        }
      }
    },
    legend: {
      item: {
        onclick: function (id) { 
          relationsChart.toggle(id, {withLegend: false});
          mainChart.toggle(id, {withLegend: false});
        }
      }
    }
  });

  // initialize relations chart, data will be loaded later
  relationsChart = c3.generate({
    bindto: '#relationChart',
    data: {
      columns: [  ],
      type: 'donut'
    },
    color: {
        pattern: ['#e67e22','#e74c3c','#3498db']
    },
    donut: {
        title: "Errors / warnings / info"
    },
    legend: {
      item: {
        onclick: function (id) { 
          relationsChart.toggle(id, {withLegend: false});
          mainChart.toggle(id, {withLegend: false});
        }
      }
    }
  });

  /**
   * Mark a host as selected
   */
  $scope.select = function(host){
    console.log('Select host ' + host.name);
    $scope.selected = host;
  };

  // TODO: Redirect to a host when none is selected #29
  // there is no selected host
  // $location.url("/dashboard/" + $scope.hosts[0]);

  /**
   * Calculate the totals for errors / warnings and info based on the data provided
   * The totals will be set on the scope
   */
  function calculateTotals(data){
    if (data && angular.isArray(data.columns)){
      copy = angular.copy(data.columns); // copy array, so we can change it 
      copy.forEach(function(item,i){
        var type = item.shift(),
        total = item.reduce(function(prev, current) {
          return prev+current;
        });
        
        switch(type){
          case 'errors':
            $scope.errorTotals = total;
            break;
          case 'warnings':
            $scope.warningTotal = total;
            break;
          case 'info':
            $scope.infoTotal = total;
            break;
          default:
            console.error("No such data: " + info);
        }
      });
    }
  }

});