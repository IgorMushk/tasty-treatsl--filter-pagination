import TastyApiService from './tasty-service';

const testyApiService = new TastyApiService();

testyApiService.fetchRecipes().then(data => console.log(data));
