new Vue({
    el: "#app",
    data: {
        tmdbApiKey: "103fbd9e3b904cfeed55ceaf1f1fc5a2",
        textToSearch: "",
        movieList: false,
        tvSeriesList: false,
        genresTv: [],
        genresMovie: [],
        filteredDataMovie:[],
        genreToFilterMovie:"",
        genreToFilterSeries:"",
        filteredDataSeries:[]

    },
    methods:
    {
        // Questa funziona ricerca tramite la parola inserita dall'utente dilm e sierie tv
        axiosSearch(type) {
            const axiosOption = {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT"
                }
            };

            axios.get("https://api.themoviedb.org/3/search/" + type, axiosOption)
                .then((resp) => {
                    if (type === "movie") {
                        this.movieList = resp.data.results
                        this.filteredDataMovie = resp.data.results
                    }
                    else if (type === "tv") {
                        this.tvSeriesList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name



                            return tvShow
                        })
                        this.filteredDataSeries = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name



                            return tvShow
                        })
                    }
                })



        },
        //questa funzione genera le stelle piene in base alla votazione.
        createStarsFull(rating) {
            let vote = Math.ceil(rating / 2);
            const stars = [];
            for (let i = 1; i <= vote; i++) {
                stars.push(1)
            }
            return stars;
        },
        //questa funzione genera le stelle vuote in base alla votazione.

        createStarsEmpty(rating) {
            let vote = Math.ceil(rating / 2);
            const stars = [];
            for (let i = vote; i < 5; i++) {
                stars.push(1)
            }
            return stars;

        },

        getImgSrc(movie) {
            if (movie.poster_path) {
                return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

            } else {
                return "img/832px-No-Image-Placeholder.svg.png"
            }
        },
        getCast(movie) {
            const axiosOption = {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "it-IT"
                }
            };
            axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, axiosOption).then(resp => {
                Vue.set(movie, 'actors', resp.data.cast.slice(0, 5));
            })

        }, getCastSeries(series) {
            const axiosOption = {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "it-IT"
                }
            };
            axios.get(`https://api.themoviedb.org/3/tv/${series.id}/credits`, axiosOption).then(resp => {
                Vue.set(series, 'actors', resp.data.cast.slice(0, 5));
            })

        },
        onSelectChangeMovie(){
            if(this.genreToFilterMovie === ""){
                this.filteredDataMovie = this.movieList
                return
            }

            const newFilteredDataMovie = this.movieList.filter((element)=>{
                return element.genre_ids[1] === this.genreToFilterMovie
            })

            this.filteredDataMovie = newFilteredDataMovie

        },onSelectChangeSeries(){
            if(this.genreToFilterSeries === ""){
                this.filteredDataSeries = this.tvSeriesList
                return
            }

            const newFilteredDataSeries = this.tvSeriesList.filter((element)=>{
                return element.genre_ids[1] === this.genreToFilterSeries
                
            })

            this.filteredDataSeries = newFilteredDataSeries

        },

        //Questa funziona invoca al click o al keyup la funziona di ricerca film o serie tv
        searchToClick() {



            this.axiosSearch("movie");
            this.axiosSearch("tv");

        }


    }, mounted() {
        axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=103fbd9e3b904cfeed55ceaf1f1fc5a2&language=it-IT")
            .then((resp) => {
                this.genresTv = resp.data.genres
            })

        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=103fbd9e3b904cfeed55ceaf1f1fc5a2&language=it-IT")
            .then((resp) => {
                this.genresMovie = resp.data.genres
            })

    }


})

