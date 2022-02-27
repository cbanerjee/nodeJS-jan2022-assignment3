//name, genre, rating (out of 10)and language

module.exports = class movie {
    constructor(name, genre, rating, language, achievements) {
        this.name = name;
        this.genre = genre;
        this.rating = rating;
        this.language = language;
        this.achievements = achievements;
    }
}