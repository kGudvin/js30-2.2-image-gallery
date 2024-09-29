document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('searchInput')
	const clearButton = document.getElementById('clearButton')
	const photoGrid = document.getElementById('photoGrid')

	// Фокус на поисковой строке
	searchInput.focus()

	// Запрос изображений по умолчанию
	function fetchPhotos(query = '') {
		const url = query
			? `https://api.unsplash.com/search/photos?query=${query}&client_id=evMWayGKzfqdKZSAXECeF3YazlRZKK2VT6YIAzMFEYI`
			: `https://api.unsplash.com/photos/?client_id=evMWayGKzfqdKZSAXECeF3YazlRZKK2VT6YIAzMFEYI`

		fetch(url)
			.then(response => response.json())
			.then(data => {
				const photos = query ? data.results : data
				photoGrid.innerHTML = photos
					.map(
						photo => `
          <div class="photo">
            <img src="${photo.urls.small}" alt="${photo.alt_description}">
          </div>
        `
					)
					.join('')
			})
	}

	// Поиск по нажатию Enter
	searchInput.addEventListener('keypress', event => {
		if (event.key === 'Enter') {
			fetchPhotos(searchInput.value)
		}
	})

	// Кнопка очистки поля поиска
	clearButton.addEventListener('click', () => {
		searchInput.value = ''
		searchInput.focus()
		fetchPhotos() // Возвращение фото по умолчанию
	})

	// Инициализация приложения
	fetchPhotos()
})
