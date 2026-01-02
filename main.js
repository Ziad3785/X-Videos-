let currentMovies = [];

// عرض الأفلام الإنجليزية أول ما الصفحة تفتح
if (typeof englishRomance !== 'undefined') {
    currentMovies = englishRomance;
    displayMovies(englishRomance);
}

// التبويبات
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const tab = button.getAttribute('data-tab');

        if (tab === 'english' && typeof englishRomance !== 'undefined') {
            currentMovies = englishRomance;
            displayMovies(englishRomance);
        } else if (tab === 'egyptian' && typeof egyptianRomance !== 'undefined') {
            currentMovies = egyptianRomance;
            displayMovies(egyptianRomance);
        }
    });
});

// عرض الأفلام (الفيديو تحت البوستر مباشرة)
function displayMovies(movieList) {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';

    if (movieList.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;font-size:30px;color:#ff1493;">مش لاقي فيلم رومانسي 😢 جرب اسم تاني</p>';
        return;
    }

    movieList.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie';
        div.innerHTML = `
            <img src="\( {movie.poster}" alt=" \){movie.title}" loading="lazy">
            <h3>${movie.title} ${movie.year ? '(' + movie.year + ')' : ''}</h3>
            <p>${movie.description}</p>
            <!-- الفيديو تحت الوصف مباشرة -->
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${movie.videoId}?rel=0&autoplay=0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen loading="lazy"></iframe>
            </div>
        `;
        container.appendChild(div);
    });
}

// البحث الفوري
document.getElementById('globalSearch').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase().trim();
    if (term === '' || currentMovies.length === 0) {
        displayMovies(currentMovies);
        return;
    }

    const filtered = currentMovies.filter(movie =>
        movie.title.toLowerCase().includes(term) ||
        movie.description.toLowerCase().includes(term) ||
        (movie.year && movie.year.toString().includes(term))
    );

    displayMovies(filtered);
});
