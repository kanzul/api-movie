function searchMovie(){

    $.ajax({

        url: 'http://omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {

            'apikey': '429d23aa',
            's': $('#search-input').val()

        },
        success: function(result){
            
            if(result.Response == "True"){

                $('#movie-list').html(''); //menghilangkan hasil pencarian sebelumnya terlebih dahulu
                
                let movies = result.Search;

                $.each(movies, function(i, data){

                    $('#movie-list').append(`

                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h6 class="card-title">`+ data.Title +`</h6>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Type +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                                </div>
                            </div>
                        </div>

                    `)
                });

                $('#search-input').val(''); //digunakan untuk menghilangkan Keyword setelah pencarian berhasil

            } else{
                $('#movie-list').html(`

                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });

}

$('#search-button').on('click', function(){

    searchMovie(); 
});

$('#search-input').on('keyup', function(event){ //search dengan ckp klik "enter" no 13

    if(event.keyCode === 13){

         searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function(){ //harus menempel pada parentnya movie-list, karena see-detail id belum ada sebelum movie disearch terlebih dahulu

    $.ajax({

        url: 'http://omdbapi.com/',
        dataType: 'json',
        type: 'get',
        data: {

            'apikey': '429d23aa',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){

                $('.modal-body').html(`
                    
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                    <li class="list-group-item">Release : ` + movie.Released +`</li>
                                    <li class="list-group-item">Gendre : ` + movie.Genre +`</li>
                                    <li class="list-group-item">Director : ` + movie.Director +`</li>
                                    <li class="list-group-item">Actors : ` + movie.Actors +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                `);
            }
        }

    });

});