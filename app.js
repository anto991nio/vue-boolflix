new Vue({
    el: "#app",
    data: {
        tmdbApiKey: "103fbd9e3b904cfeed55ceaf1f1fc5a2",
        textToSearch: "",
        movieList: [],
        tvSeriesList: [],
        
    },
    methods: {
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

                    } else if (type === "tv") {
                        this.tvSeriesList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name

                            return tvShow
                        })
                    }
                })



        },
        //questa funzione genera le stelle in base alla votazione.
        createStars(rating) {

            let vote = Math.ceil(rating / 2);

            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= vote) {
                    stars.push('<i class="fa fa-star" aria-hidden="true"></i>') 
                } else {
                    stars.push('<i class="fa fa-star-o" aria-hidden="true"></i>') 
                }
            }
            return stars;
        },

        //Questa funziona invoca al click o al keyup la funziona di ricerca film o serie tv
        searchToClick() {

            this.axiosSearch("movie");
            this.axiosSearch("tv");
        },
    }
})