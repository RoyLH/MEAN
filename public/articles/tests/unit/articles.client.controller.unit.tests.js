'use strict';

describe('Testing Articles Controller', function () {
    var _scope, ArticlesController;

    beforeEach(function () {
        module('mean');

        jasmine.addMatchers({
            // https://jasmine.github.io/tutorials/upgrading_to_Jasmine_4.0#matchers-cet
            toEqualData: function (matchersUtil) {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });

        inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();
            ArticlesController = $controller('ArticlesController', {
                $scope: _scope
            });
        });
    });

    it('Should have a find method that uses $resource to retrieve a list if articles', inject(function (Articles) {
        inject(function ($httpBackend) {
            var sampleArticle = new Articles({
                title: 'An Article about MEAN',
                content: 'MEAN rocks!'
            });
            var sampleArticles = [sampleArticle];
            $httpBackend.expectGET('/api/articles').respond(sampleArticles);

            _scope.find();
            $httpBackend.flush();
            expect(_scope.articles).toEqualData(sampleArticles);
        });
    }));

    it('Should have a findOne method that users $resource to retrieve a single if article', inject(function (Articles) {
        inject(function ($httpBackend, $routeParams) {
            var sampleArticle = new Articles({
                title: 'An Article about MEAN',
                content: 'MEAN rocks!'
            });

            $routeParams.articleId = 'abcdef123456789012345678';

            $httpBackend.expectGET(/\/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

            _scope.findOne();
            $httpBackend.flush();

            expect(_scope.article).toEqualData(sampleArticle);
        });
    }));
});
