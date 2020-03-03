/*refactoring adaalah merapikan codingan kita menjadi barbasis function
agar terlihat lebih rapi*/

const search = document.querySelector('#search-button');
let keyword =  document.querySelector('#user-search');

search.addEventListener('click', function(){
	fetch('http://www.omdbapi.com/?apikey=8dd7cc4a&s=' + keyword.value )
		.then(response => response.json())
		.then(response => {
			let hasil = response.Search;
			movieResult(hasil);
			

			//Ketika Tombol See Details Di klik
			/*Kita tidak bisa langsung membuat event handler contoh details.addEventListener
			karena details berbentuk NodeList, jadi kita harus memecah NodeList nya terlebih
			dahulu*/

			let details = document.querySelectorAll('.modal-detail');
			
			details.forEach(button => {
				button.addEventListener('click', function() {
					let resultDetail = this.dataset.id;

					fetch ('http://www.omdbapi.com/?apikey=8dd7cc4a&i=' + resultDetail)
						.then(response => response.json())
						.then(detail => {
							
							movieDetail(detail);					
						})
				
			});
		});
	});
			
});










function movieResult(response){
	let dom = document.querySelector('#movie-list');
	let result ='';
	response.forEach(m => {
				result += `				
		          <div class="card mb-4 mr-4 ml-3">
		            <img src="${m.Poster}" class="card-img-top" alt="...">
		              <div class="card-body">
		                <h5 class="card-title ">${m.Title}</h5>
		                 <p class="card-text text-muted">${m.Year}</p>
		                   <a href="#" class="btn btn-primary modal-detail" data-toggle="modal" data-target="#movieDetail" data-id="${m.imdbID}">See Details</a>
		              </div>
		          </div>
				`;

			dom.innerHTML = result;
};

function movieDetail(param){
	let hasil = '';
							
		hasil += `
			<div class="container-fluid">
		       <div class="row">
				  	<div class="col-md-4">
					 	<img src="${param.Poster}" class="img-fluid">
					</div>
					<div class="col-md-8">
						<ul class="list-group">						            
						   	<li class="list-group-item"><h4>${param.Title} |  ${param.Year}</h4></li>
						    <li class="list-group-item">Director : <b>${param.Director}</b></li>
						    <li class="list-group-item">Actors : <b>${param.Actors}</b></li>
						    <li class="list-group-item">Writer : <b>${param.Writer}</b></li>
						    <li class="list-group-item">Plot : <b>${param.Plot}</b></li>
						</ul>
					</div>
				</div>	
			</div>`;
							
		let modal = document.querySelector('.modal-body');
		modal.innerHTML = hasil;
};