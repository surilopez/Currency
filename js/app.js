(function() {

    var app = angular.module('universidadApp', ['ngSanitize', 'ngCsv', 'currencyFormat']);



    app.controller('currencyListCtrl', ['$scope', '$filter', '$rootScope', 'currencyFormatService', function($scope, $filter, $rootScope, currencyFormatService) {

        $scope.currencies = currencies
        $scope.amount = 1234.567;
        $scope.showBoxForAdd = false;
        $scope.showBoxForEdit = false;
        $scope.Id = 3;
        $scope.IdForEdit = -1;

        $scope.AddNewCurrency = "";
        $scope.selectedCurrencyCode = 'USD';
        $scope.selectedCurrencyLocaleId = 'en_US';
        $scope.noCents = false;

        $scope.currencies1 = currencyFormatService.getCurrencies();
        $scope.localeIds = currencyFormatService.getLanguages();


        $scope.$watchGroup(['amount', 'selectedCurrencyCode', 'fractionSize'], function() {
            $scope.currencyInfo = currencyFormatService.getByCode($scope.selectedCurrencyCode);
        });

        $scope.$watch('selectedCurrencyLocaleId', function() {
            $scope.formatCurrencyAmount = currencyFormatService.getLanguageByCode($scope.selectedCurrencyLocaleId);
        });



        $scope.ExportCurrencies = function() {

            console.error("ExportCurrencies")
        }

        $scope.SetActiveCurrency = function(value) {

            currencies.forEach(element => {
                if (element != value) {
                    element.active = false;
                }

            });
            console.log(value)
        }

        $scope.AddNewCurrencyForm = function() {
            $scope.showBoxForAdd = true;


        }

        $scope.EditCurrency = function(value) {

            $scope.showBoxForAdd = true;
            $scope.showBoxForEdit = true;
            $scope.IdForEdit = value.Id;
            console.log(value);
            $scope.AddNewCurrency = value.country;
            $scope.selectedCurrencyCode = value.code;
            $scope.selectedCurrencyLocaleId = value.CurrencyLocaleId;
            $scope.noCents = false;



        }
        $scope.DeleteCurrency = function(value) {

            let i = $scope.currencies.indexOf(value)
            $scope.currencies.splice(i, 1);



        }
        $scope.Cancel = function() {
            $scope.showBoxForAdd = false;

        }

        $scope.SaveCurrency = function(frmValue) {
            if (!frmValue) {
                return;
            }
            if (!$scope.showBoxForEdit) {
                $scope.currencies.push({
                    Id: $scope.Id++,
                    country: $scope.AddNewCurrency,
                    code: $scope.selectedCurrencyCode,
                    CurrencyLocaleId: $scope.selectedCurrencyLocaleId,
                    noCents: $scope.noCents,
                    active: false
                })
            } else {
                currencies.forEach(element => {
                    if ((element.Id == $scope.IdForEdit)) {
                        element.country = $scope.AddNewCurrency,
                            element.code = $scope.selectedCurrencyCode,
                            element.CurrencyLocaleId = $scope.selectedCurrencyLocaleId,
                            element.noCents = $scope.noCents

                        $scope.showBoxForEdit = false;
                        $scope.IdForEdit = -1;
                        return
                    }
                });


            }
            $scope.AddNewCurrency = "";
            $scope.selectedCurrencyCode = 'USD';
            $scope.selectedCurrencyLocaleId = 'en_US';

        }

    }]);

})();

var currencies = [{
    Id: 0,
    country: "Unite State",
    code: 'USD',
    CurrencyLocaleId: 'en_US',
    active: true,
    noCents: false
}, {
    Id: 1,
    country: "Francia",
    code: 'EUR',
    CurrencyLocaleId: 'fr_FR',
    active: false,
    noCents: false

}, {
    Id: 2,
    country: "Alemania",
    code: 'EUR',
    CurrencyLocaleId: 'de_DE',
    active: false,
    noCents: false
}]