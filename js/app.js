const categoriesContent = document.querySelector('#categories')
const categoryName = document.querySelector('#category-name')
const main = document.querySelector('#main') 

const sidebar = document.querySelector('#sidebar')
const sidebarBtn = document.querySelector('#sidebar-btn')
let selectedCategory = 'Beef'
const arr =  [1, 2, 3, 4, 5, 6]

function fetchCategories() {
	arr.map(item => {
		categoriesContent.innerHTML += `
		<div role="status" class="max-w-sm animate-pulse">
          <!--skeleton item-->
          <div class="h-[70px] bg-gray-50 rounded-md dark:bg-gray-300 w-full mb-4 p-4 flex items-center gap-4">
            <div class="w-[50px] h-[50px] bg-gray-200 dark:bg-gray-400 rounded-md">
              <div class="w[100px] h-[30px] rounded-full bg-gray-200 dark:bg-gray-400"></div>
            </div>
          </div>
        </div>
		<!--skeleton loader ended-->
		` 
	})

	fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
		.then(res => res.json())
		.then(data => renderCategories(data.categories))
		.catch(err => console.log(err))
}

function renderCategories(categories) {
	categoriesContent.innerHTML = ''
	categories.map(item => {
		categoriesContent.innerHTML += `
      <li
        onclick="fetchMeals(this)"
        data-category="${item.strCategory}"
        class='flex gap-4 p-4 shadow-sm rounded-md items-center cursor-pointer bg-slate-50 hover:shadow-md transform active:scale-95 border ${
					selectedCategory === item.strCategory ? 'border-blue-500' : ''
				}'>
        <img 
          class='rounded-md object-cover' 
          width='70' height='70' 
          src='${item.strCategoryThumb}' />
        <h1 
          class='text-2xl text-slate-700 w-full truncate'>
            ${item.strCategory}
        </h1>
      </li>
    `
	})
}


function fetchMeals(categoryElement) {
	sidebar.classList.remove('sm:flex')
	sidebar.classList.add('sm:hidden')
	arr.map(item => {
		main.innerHTML += `
		<!--single skeleton card item start-->
		<div role='status' class="max-w-sm animate-pulse">
		<div class="bg-gray-50 dark:bg-gray-200 rounded-md min-h-[300px] p-4">
		<div class="flex items-center justify-center w-full h-[230px] bg-gray-100 rounded-md dakr:bg-gray-300">
		<i class="bx bx-image-alt text-8xl text-gray-100 text-gray-400"></i>
		</div>
		<div class="w-full mt-4 mx-auto rounded-md bg-gray-100 bg-gray-300 h-[30px]"></div>
		</div>
		</div>
		<!--single skeleton card item ended-->
		`
	})
	selectedCategory = categoryElement?.dataset?.category
	fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryElement?.dataset?.category || 'Beef'}`
	)
		.then(res => res.json())
		.then(data => renderMeals(data.meals))
		.catch(err => console.log(err))
}

function renderMeals(array) {
	categoryName.innerHTML = selectedCategory || 'Beef'
	main.innerHTML = ''
	array.map(item => {
		main.innerHTML += `
		<div
          class="item bg-white shadow-md p-4 rounded-md cursor-pointer flex items-center justify-center gap-4 flex-col">
          <img class='rounded-md' src="${item.strMealThumb}" alt="" height="250" width="300px">
          <h1>${item.strMeal}</h1>
        </div>
		`
	})
}


sidebarBtn.addEventListener('click', () => {
	sidebar.classList.remove('sm:hidden')
	sidebar.classList.add('sm:fixed')
})

fetchMeals('Beef')
fetchCategories()
