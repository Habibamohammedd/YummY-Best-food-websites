// Navbar
$(document).ready(function () {
    let sideNav = $('.side-nav-menu');
    let openCloseIcon = $('.open-close-icon');

    function closeSideNav() {
        sideNav.addClass('closed');
        openCloseIcon.removeClass('fa-times').addClass('fa-align-justify');
    }

    function openSideNav() {
        sideNav.removeClass('closed');
        openCloseIcon.removeClass('fa-align-justify').addClass('fa-times');
    }

    openCloseIcon.on('click', function () {
        if (sideNav.hasClass('closed')) {
            openSideNav();
        } else {
            closeSideNav();
        }
    });

    $('.side-nav-menu .links li').on('click', function () {
        closeSideNav();
    });
});
// Mainpage
var meals = [];
async function getRecipe() {
    for (var i = 0; i < 25; i++) {
        var res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        var data = await res.json();
        meals = meals.concat(data.meals);
    }
    displayMeal(meals);
}
getRecipe();

var mainpagesection = document.getElementById("mainpage");

function displayMeal(meals) {
    var cartona = "";
    for (var i = 0; i < meals.length; i++) {
        cartona +=`<div class="col-md-3 position-relative meal-item mb-4 cursor-pointer" data-id="${meals[i].idMeal}">
    <div class="position-relative">
        <img src="${meals[i].strMealThumb}" alt="" class="img-fluid rounded-4">
        <div class="dhover1 bg-white text-black d-flex align-items-center justify-content-center">
            <h2>${meals[i].strMeal.split(" ").slice(0, 1).join(" ")}</h2>
        </div>
    </div>
</div>
`;
    }
    mainpagesection.innerHTML = cartona;
    clickitem();
}
/////////////////////////
//function to click :

function displayclick(meals) {
    let cartona = "";
    for (let i = 0; i < meals.length; i++) {
        cartona += `<div class="col-md-3 position-relative meal-item cursor-pointer mb-3" data-id="${meals[i].idMeal}">
            <div class="div position-relative">
                <img src="${meals[i].strMealThumb}" alt="" class="img-fluid rounded-2">
                <div class="dhover bg-white text-black d-flex align-items-center justify-content-center">
                    <h2>${meals[i].strMeal.split(" ").slice(0, 1).join(" ")}</h2>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("mainpage").innerHTML = cartona;
    clickitem();
}

function clickitem() {
    var mealItems = document.querySelectorAll('.meal-item');
    mealItems.forEach(item => {
        item.addEventListener('click', function() {
            var mealId = this.getAttribute('data-id');
            fetchMealDetails(mealId);
        });
    });
}

async function fetchMealDetails(mealId) {
    try {
        var res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        var data = await res.json();
        var meal = data.meals[0];
        displayRecipe(meal);
    } catch (error) {
        console.error("Error fetching meal details:", error);
    }
}

function displayRecipe(meal) {
    document.getElementById('recipe-image').src = meal.strMealThumb;
    document.getElementById('recipe-title').textContent = meal.strMeal;
    document.getElementById('instruction').textContent = meal.strInstructions;
    document.getElementById('areatext').innerHTML = `<span class="h2 fwbold">Area : </span>${meal.strArea}`;
    document.getElementById('categorytext').innerHTML = `<span class="h2 fwbold">Category : </span>${meal.strCategory}`;

    // Display recipes
    var ingredients = "";
    for (var i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info w-mine m-1" role="alert">${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
        }
    }
    document.getElementById('rdetails').innerHTML = ingredients;

    // Display tags
    var tags = meal.strTags ? meal.strTags.split(',') : [];
    var tagHtml = "";
    tags.forEach(tag => {
        tagHtml += `<li class="alert alert-danger w-mine m-1" role="alert">${tag}</li>`;
    });
    document.getElementById('tags').innerHTML = tagHtml;

    // Set source and YouTube buttons
    document.getElementById('source').onclick = function() {
        window.open(meal.strSource, '_blank');
    };
    document.getElementById('YouTube').onclick = function() {
        window.open(meal.strYoutube, '_blank');
    };

    
    document.getElementById('recipe-section').classList.remove('d-none');
    document.getElementById('mainpage').classList.add('d-none');
    document.getElementById("iconcategories").classList.add('d-none'); 
    document.getElementById('isec').classList.add('d-none');
    document.getElementById('dcontact').classList.add('d-none');
    document.getElementById('iconarea').classList.add('d-none');
    document.getElementById('iconsearch').classList.add('d-none');
    document.getElementById('searchResult').classList.add('d-none');
}
/////////////////////////////////////////
// Area
var area = [];

async function getarea() {
    try {
        var res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        var data = await res.json();
        console.log(data); 
        area = data.meals; 
        displayarea();
    }
     catch (error) {
        console.error("Error fetching area:", error);
    }
}


document.getElementById("areabtn").addEventListener("click", function() 
{
    console.log("Hello");
   document.getElementById("mainpage").classList.add('d-none');
   document.getElementById("iconcategories").classList.add('d-none'); 
    document.getElementById('isec').classList.add('d-none');
    document.getElementById('iconarea').classList.remove('d-none');
    document.getElementById('recipe-section').classList.add('d-none');  
    document.getElementById('dcontact').classList.add('d-none');
    document.getElementById('iconsearch').classList.add('d-none');
    document.getElementById('searchResult').classList.add('d-none');
    getarea();
});
var areasection = document.getElementById("iconarea");

function displayarea() 
{
    var cartona = "";
    for (var i = 0; i < area.length; i++)
         {
        cartona += `
            <div class="col-md-3 mb-2 areaitem cursor-pointer" data-area="${area[i].strArea}">
                <div class="div position-relative d-flex justify-content-center align-items-center flex-column">
                    <i class="fa-solid fa-house-laptop iconsize"></i>
                    <h2>${area[i].strArea}</h2>
                </div>
            </div>`;
    }
    areasection.innerHTML = cartona;
    areaclickhere();
}

function areaclickhere() {
    $(".areaitem").on('click', function () {
        let area = $(this).data('area');
        mealsarea(area);
    });
}

async function mealsarea(area) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let data = await response.json();
        displayclick(data.meals);
        document.getElementById("mainpage").classList.remove('d-none');
        document.getElementById("iconcategories").classList.add('d-none'); 
        document.getElementById('isec').classList.add('d-none');
        document.getElementById('dcontact').classList.add('d-none');
        document.getElementById('iconarea').classList.add('d-none');
        document.getElementById('recipe-section').classList.add('d-none');
        document.getElementById('iconsearch').classList.add('d-none');
        document.getElementById('searchResult').classList.add('d-none');
    } catch (error) {
        console.error("Error fetching meals by area:", error);
    }
}
////////////////////////////////////

// Ingredients
var ingredient = [];

async function getingrediant() 
{
    try {
        var res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        var data = await res.json();
        ingredient = data.meals;
       displayingrediant();
    } catch (error) {
        console.error("Error fetching ingredients:", error);
    }
}
document.getElementById("Ingredientsbtn").addEventListener("click", function() 
{
   document.getElementById("mainpage").classList.add('d-none');
   document.getElementById("iconcategories").classList.add('d-none'); 
    document.getElementById('isec').classList.remove('d-none');
    document.getElementById('dcontact').classList.add('d-none');
    document.getElementById('recipe-section').classList.add('d-none');
    document.getElementById('iconarea').classList.add('d-none');
    document.getElementById('iconsearch').classList.add('d-none');
    document.getElementById('searchResult').classList.add('d-none');
    getingrediant();
});
var ingredientsection = document.getElementById("isec");
function displayingrediant() {
    var cartona = "";
    for (var i = 0; i <=20; i++) {
        cartona += `
            <div class="col-md-3 d-flex justify-content-center align-items-center flex-column ingredientitem cursor-pointer mb-3" data-ingredient="${ingredient[i].strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x mb-2"></i>
                <h2 class="h1 text-center">${ingredient[i].strIngredient.split(" ").slice(0,2).join(" ")}</h2>
                <p class="text-center">${ingredient[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>`;
    }
    ingredientsection.innerHTML = cartona;
    ingredientclickhere();
    
}
function ingredientclickhere() {
    $(".ingredientitem").on('click', function () {
        let ingredient = $(this).data('ingredient');
        ingredientmeals(ingredient);
    });
}

async function ingredientmeals(ingredient) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        let data = await response.json();
        displayclick(data.meals);
        document.getElementById("mainpage").classList.remove('d-none');
        document.getElementById("iconcategories").classList.add('d-none'); 
        document.getElementById('isec').classList.add('d-none');
        document.getElementById('iconarea').classList.add('d-none');
        document.getElementById('recipe-section').classList.add('d-none');
        document.getElementById('dcontact').classList.add('d-none');
        document.getElementById('iconsearch').classList.add('d-none');
        document.getElementById('searchResult').classList.add('d-none');
    } catch (error) {
        console.error("Error fetching meals by ingredient:", error);
    }
}
//////////////////////////////////////////////////////
//category
var category = [];

async function getcategory() {
    try {
        var res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        var data = await res.json();
        category = data.categories;
        displaycategory();
        console.log(category);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

document.getElementById("Categoriesbtn").addEventListener("click", function() {
    document.getElementById("mainpage").classList.add('d-none');
    document.getElementById("iconcategories").classList.remove('d-none');
    document.getElementById('isec').classList.add('d-none');
    document.getElementById('iconarea').classList.add('d-none');
    document.getElementById('recipe-section').classList.add('d-none');
    document.getElementById('dcontact').classList.add('d-none');
    document.getElementById('iconsearch').classList.add('d-none');
    document.getElementById('searchResult').classList.add('d-none');
    getcategory();
});

var categorysection = document.getElementById("iconcategories");

function displaycategory() {
    var cartona = "";
    for (var i = 0; i < category.length; i++) {
        cartona += 
        `<div class="col-md-3 position-relative categoryitem cursor-pointer mb-3" data-category="${category[i].strCategory}">
            <div class="position-relative categ">
                <img src="${category[i].strCategoryThumb}" alt="" class="img-fluid rounded-2">
                <div class="dhover bg-white d-flex align-items-center justify-content-center flex-column">
                    <h2>${category[i].strCategory}</h2>
                    <p class="text-center">${category[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>`;
    }
    categorysection.innerHTML = cartona;
    categoryclickhere();
}

function categoryclickhere() {
    document.querySelectorAll('.categoryitem').forEach(item => {
        item.addEventListener('click', function() {
            let category = this.getAttribute('data-category');
            getMealsByCategory(category);
            console.log("Category clicked:", category);
        });
    });
}

async function getMealsByCategory(category) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();
        displayclick(data.meals);
        console.log(data.meals);
        document.getElementById("mainpage").classList.remove('d-none');
        document.getElementById("iconcategories").classList.add('d-none'); 
        document.getElementById('isec').classList.add('d-none');
        document.getElementById('iconarea').classList.add('d-none');
        document.getElementById('recipe-section').classList.add('d-none');
        document.getElementById('dcontact').classList.add('d-none');
        document.getElementById('iconsearch').classList.add('d-none');
        document.getElementById('searchResult').classList.add('d-none');
        
    } catch (error) {
        console.error("Error fetching meals by category:", error);
    }
}


/////////////////////////////////////////////

//contact
// Contact form display
document.getElementById('contactbtn').addEventListener('click', function () {
    document.getElementById('mainpage').classList.add('d-none');
    document.getElementById('iconcategories').classList.add('d-none');
    document.getElementById('iconarea').classList.add('d-none');
    document.getElementById('recipe-section').classList.add('d-none');
    document.getElementById('isec').classList.add('d-none');
    document.getElementById('dcontact').classList.remove('d-none');
    document.getElementById('iconsearch').classList.add('d-none');
    document.getElementById('searchResult').classList.add('d-none');
});

// Form validation functions
function validateName(name) {
    return /^[a-zA-Z ]+$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

function validateAge(age) {
    return age > 0 && age < 150;
}

function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function validateRepassword(password, repassword) {
    return password === repassword;
}

function updateSubmitButton() {
    let nameValid = validateName(document.getElementById('nameInput').value);
    let emailValid = validateEmail(document.getElementById('emailInput').value);
    let phoneValid = validatePhone(document.getElementById('phoneInput').value);
    let ageValid = validateAge(document.getElementById('ageInput').value);
    let passwordValid = validatePassword(document.getElementById('passwordInput').value);
    let repasswordValid = validateRepassword(document.getElementById('passwordInput').value, document.getElementById('repasswordInput').value);

    let formValid = nameValid && emailValid && phoneValid && ageValid && passwordValid && repasswordValid;

    document.getElementById('submitBtn').disabled = !formValid;
}

// Form input validation 
document.getElementById('nameInput').addEventListener('input', function () {
    document.getElementById('nameAlert').classList.toggle('d-none', validateName(this.value));
    updateSubmitButton();
});

document.getElementById('emailInput').addEventListener('input', function () {
    document.getElementById('emailAlert').classList.toggle('d-none', validateEmail(this.value));
    updateSubmitButton();
});

document.getElementById('phoneInput').addEventListener('input', function () {
    document.getElementById('phoneAlert').classList.toggle('d-none', validatePhone(this.value));
    updateSubmitButton();
});

document.getElementById('ageInput').addEventListener('input', function () {
    document.getElementById('ageAlert').classList.toggle('d-none', validateAge(this.value));
    updateSubmitButton();
});

document.getElementById('passwordInput').addEventListener('input', function () {
    document.getElementById('passwordAlert').classList.toggle('d-none', validatePassword(this.value));
    updateSubmitButton();
});

document.getElementById('repasswordInput').addEventListener('input', function () {
    document.getElementById('repasswordAlert').classList.toggle('d-none', validateRepassword(document.getElementById('passwordInput').value, this.value));
    updateSubmitButton();
});

document.getElementById('submitBtn').addEventListener('click', function (e) {
    e.preventDefault();
});

// Search button event listener
document.getElementById('searchbtn').addEventListener('click', function () {
    document.getElementById('mainpage').classList.add('d-none');
    document.getElementById('iconcategories').classList.add('d-none');
    document.getElementById('iconarea').classList.add('d-none');
    document.getElementById('recipe-section').classList.add('d-none');
    document.getElementById('isec').classList.add('d-none');
    document.getElementById('dcontact').classList.add('d-none');
    document.getElementById('iconsearch').classList.remove('d-none');
    document.getElementById('searchResult').classList.add('d-none');
    console.log("hello");
});
document.addEventListener('DOMContentLoaded', function () {
    const searchByNameInput = document.getElementById('searchByName');
    const searchByFirstLetterInput = document.getElementById('searchByFirstLetter');
    const searchResultContainer = document.getElementById('searchResult');

    // Event listener for the search input field
    searchByNameInput.addEventListener('input', function () {
        const query = searchByNameInput.value.trim();
        if (query.length > 0) {
            searchByName(query);
        } else {
            searchResultContainer.classList.add('d-none');
        }
    });

    searchByFirstLetterInput.addEventListener('input', function () {
        const query = searchByFirstLetterInput.value.trim();
        if (query.length === 1) {
            searchByFirstLetter(query);
        } else {
            searchResultContainer.classList.add('d-none');
        }
    });

    // Function to search by meal name
    function searchByName(mealName) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.meals);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to search by first letter
    function searchByFirstLetter(letter) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.meals);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

   
// Display search results
function displaySearchResults(meals) {
    searchResultContainer.innerHTML = '';

    if (meals) {
        searchResultContainer.classList.remove('d-none');
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('col-md-3', 'position-relative', 'meal-item', 'mb-3', 'cursor-pointer');
            mealElement.setAttribute('data-id', meal.idMeal);
            mealElement.innerHTML = `
               <div class="position-relative m-2">
                   <img src="${meal.strMealThumb}" alt="" class="img-fluid rounded-2" alt="${meal.strMeal}">
                   <div class="dhover bg-white text-black d-flex align-items-center justify-content-center">
                       <h2>${meal.strMeal}</h2>
                   </div>
               </div>
            `;
            mealElement.addEventListener('click', function () {
                fetchMealDetails(meal.idMeal);
            });

            rowDiv.appendChild(mealElement);
        });

        searchResultContainer.appendChild(rowDiv);
    } else {
        searchResultContainer.innerHTML = '<p>No results found.</p>';
    }
        clickitem();
    }

    // Function to handle viewing the recipe 
    window.viewRecipe = function (mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                
                console.log('Recipe data:', data.meals[0]);
            })
            .catch(error => {
                console.error('Error fetching recipe data:', error);
            });
    };
});