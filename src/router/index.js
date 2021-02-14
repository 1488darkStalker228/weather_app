import Vue from 'vue';
import VueRouter from 'vue-router';
import CityPage from "../components/CityPage/CityPage.vue";
import Favorites from "../components/Favorites/Favorites.vue";
import AllCities from "../components/AllCities/AllCities.vue";
import Compare from "../components/Compare/Compare.vue";
import MainLayout from "../layouts/MainLayout";
import PageNotFound from "../components/404/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'MainPage',
        component: CityPage
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
      },
      {
        path: '/cities',
        name: 'AllCities',
        component: AllCities
      },
      {
        path: '/cities/:id',
        name: 'CityPage',
        component: CityPage
      }
    ]
  },

  {
    path: '/compare',
    name: 'Compare',
    component: Compare
  },

  {
    path: '*',
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
