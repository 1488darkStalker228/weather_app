export default {
  methods: {
    toggleFavorites(city) {
      const tmp = this.favorites.find(favCity => favCity.id === city.id);

      if (!tmp) {
        this.favorites.push(city);
        localStorage.setItem('cities', JSON.stringify(this.favorites));
      } else {
        this.favorites = this.favorites.filter(favCity => favCity.id !== tmp.id);
        localStorage.setItem('cities', JSON.stringify(this.favorites));
      }
    }
  }
}



