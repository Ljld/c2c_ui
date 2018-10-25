import constants from '@/js/constants.js'
import config from "@/js/config.js"

import Vue from 'vue'
import Router from 'vue-router'

import HomeView from '@/components/views/staticViews/HomeView'
import SeracView from '@/components/views/staticViews/SeracView'
import WorkInProgressView from '@/components/views/staticViews/WorkInProgressView'
import NotFoundView from '@/components/views/staticViews/NotFoundView'

import DashboardView from '@/components/views/portals/DashboardView'
import FeedView from '@/components/views/portals/FeedView'
import SearchView from '@/components/views/search/SearchView'

import LoginView from '@/components/views/user/LoginView'
import AccountView from '@/components/views/user/AccountView'
import FollowingView from '@/components/views/user/FollowingView'
import PreferencesView from '@/components/views/user/PreferencesView'
import MailingListsView from '@/components/views/user/MailingListsView'

import DocumentsView from '@/components/views//documents/DocumentsView'
import ImagesView from '@/components/views/documents/ImagesView'

import AreaView from '@/components/views/document/AreaView'
import ArticleView from '@/components/views/document/ArticleView'
import BookView from '@/components/views/document/BookView'
import ImageView from '@/components/views/document/ImageView'
import MapView from '@/components/views/document/MapView'
import OutingView from '@/components/views/document/OutingView'
import ProfileView from '@/components/views/document/ProfileView'
import RouteView from '@/components/views/document/RouteView'
import WaypointView from '@/components/views/document/WaypointView'
import XreportView from '@/components/views/document/XreportView'

// import AreaEditionView from '@/components/views/edition/AreaEditionView'
// import ArticleEditionView from '@/components/views/edition/ArticleEditionView'
// import BookEditionView from '@/components/views/edition/BookEditionView'
// import ImageEditionView from '@/components/views/edition/ImageEditionView'
// import MapEditionView from '@/components/views/edition/MapEditionView'
// import OutingEditionView from '@/components/views/edition/OutingEditionView'
// import ProfileEditionView from '@/components/views/edition/ProfileEditionView'
// import RouteEditionView from '@/components/views/edition/RouteEditionView'
// import WaypointEditionView from '@/components/views/edition/WaypointEditionView'
// import XreportEditionView from '@/components/views/edition/XreportEditionView'
//
// // lazy load components
// // actually, only diff is quite big, because of diff computation
// // but lets group together this three views.
// const WhatsNewView = () => import(/* webpackChunkName: "wiki-tools" */ `@/components/views/wiki/WhatsNewView.vue`)
// const HistoryView = () => import(/* webpackChunkName: "wiki-tools" */ `@/components/views/wiki/HistoryView.vue`)
// const DiffView = () => import(/* webpackChunkName: "wiki-tools" */ `@/components/views/wiki/DiffView.vue`)

// lazy load components
// actually, only diff is quite big, because of diff computation
// but lets group together this three views.
const AreaEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/AreaEditionView')
const ArticleEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/ArticleEditionView')
const BookEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/BookEditionView')
const ImageEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/ImageEditionView')
const MapEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/MapEditionView')
const OutingEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/OutingEditionView')
const ProfileEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/ProfileEditionView')
const RouteEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/RouteEditionView')
const WaypointEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/WaypointEditionView')
const XreportEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/components/views/edition/XreportEditionView')
const WhatsNewView = () => import(/* webpackChunkName: "wiki-tools" */ `@/components/views/wiki/WhatsNewView.vue`)
const HistoryView = () => import(/* webpackChunkName: "wiki-tools" */ `@/components/views/wiki/HistoryView.vue`)
const DiffView = () => import(/* webpackChunkName: "wiki-tools" */ `@/components/views/wiki/DiffView.vue`)


var routes = [
    { path: '/',             name: 'home',           component: HomeView },
    { path: '/dashboard',    name: 'dashboard',      component: DashboardView },
    { path: '/feed',         name: 'feed',           component: FeedView },
    { path: '/serac',        name: 'serac',          component: SeracView },
    { path: '/search',       name: 'search',         component: SearchView },
    { path: '/whatsnew',     name: 'whatsnew',       component: WhatsNewView },
    { path: '/auth',         name: 'auth',           component: LoginView },
    { path: '/account',      name: 'account',        component: AccountView },
    { path: '/following',    name: 'following',      component: FollowingView },
    { path: '/preferences',  name: 'preferences',    component: PreferencesView },
    { path: '/mailinglists', name: 'mailinglists',   component: MailingListsView },

    { path: '/wip', name: 'workinprogress',   component: WorkInProgressView },

    {
        path: '/forum',
        name: 'forum',
        beforeEnter() {
            location.href = config.urls.forum
        }
    },
]


const addDocumentTypeView = function(def, viewComponent, editionComponent){

    routes.push({
        path: '/' + def.documentType + 's',
        name: def.documentType + 's',
        component: def.documentType=='image' ? ImagesView : DocumentsView},
    )

    routes.push({
        path: '/' + def.documentType + 's/:id(\\d+)/:lang?',
        name: def.documentType ,
        component: viewComponent},
    )

    routes.push({
        path: '/' + def.documentType + 's/version/:id(\\d+)/:lang/:version',
        name: def.documentType + "-version",
        component: viewComponent},
    )

    routes.push({
        path: '/' + def.documentType + 's/history/:id(\\d+)/:lang',
        name: def.documentType + "-history",
        component: HistoryView},
    )

    routes.push({
        path: '/' + def.documentType + 's/edit/:id(\\d+)/:lang',
        name: def.documentType + "-edit",
        component: editionComponent},
    )

    routes.push({
        path: '/' + def.documentType + 's/add/:lang?',
        name: def.documentType + "-add",
        component: editionComponent},
    )

    routes.push({
        path: '/' + def.documentType + 's/diff/:id(\\d+)/:lang/:versionFrom/:versionTo',
        name: def.documentType + "-diff",
        component: DiffView},
    )
}


addDocumentTypeView(constants.objectDefinitions.area,  AreaView, AreaEditionView)
addDocumentTypeView(constants.objectDefinitions.article,  ArticleView, ArticleEditionView)
addDocumentTypeView(constants.objectDefinitions.book,  BookView, BookEditionView)
addDocumentTypeView(constants.objectDefinitions.image,  ImageView, ImageEditionView)
addDocumentTypeView(constants.objectDefinitions.map,  MapView, MapEditionView)
addDocumentTypeView(constants.objectDefinitions.outing,  OutingView, OutingEditionView)
addDocumentTypeView(constants.objectDefinitions.profile,  ProfileView, ProfileEditionView)
addDocumentTypeView(constants.objectDefinitions.route,  RouteView, RouteEditionView)
addDocumentTypeView(constants.objectDefinitions.waypoint,  WaypointView, WaypointEditionView)
addDocumentTypeView(constants.objectDefinitions.xreport,  XreportView, XreportEditionView)

routes.push({ path: '*', name: '404',   component: NotFoundView })

Vue.use(Router)

export default new Router({
    routes,
    mode: config.routerMode,
})
