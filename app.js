new Vue({
    el: "#app",
    data: {
        tmdbApiKey: "103fbd9e3b904cfeed55ceaf1f1fc5a2",
        textToSearch: "",
        movieList: [],
        tvSeriesList: [],
        listafilm:false
        
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
                        this.listafilm=true
                        this.movieList = resp.data.results

                    } else if (type === "tv") {
                        this.tvSeriesList = resp.data.results.map((tvShow) => {
                            tvShow.original_title = tvShow.original_name
                            tvShow.title = tvShow.name
                            this.listafilm=true


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

        getImgSrc(movie){
            if(movie.poster_path){
                return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

            }else{
               return "img/832px-No-Image-Placeholder.svg.png"
            }
        },
       /*  getCast(movie){
           const actors = []
            const axiosOption = {
                params: {
                    api_key: this.tmdbApiKey,
                    language: "it-IT"
                }
            };
            axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`,axiosOption).then(resp=>{
                debugger
                this.actors = resp.data.cast;
                
            })
            return actors
        },
 */
        //Questa funziona invoca al click o al keyup la funziona di ricerca film o serie tv
        searchToClick() {

            this.axiosSearch("movie");
            this.axiosSearch("tv");
            
        },
    }
})