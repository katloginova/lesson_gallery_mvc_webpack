'use strict';

import {URL_ALBUMS, URL_PHOTOS} from '../config';
import GalleryCollection from '../model/GalleryCollection';
import GalleryView from '../view/GalleryView';


export default class GalleryController{
    constructor($el){
        this._initAlbumId = 1;

        this.initGallery();
        this.initView($el);
    }

    initGallery(){
        this.galleryCollection = new GalleryCollection(URL_ALBUMS, URL_PHOTOS);

        this.galleryCollection.fetchAlbumsList().then(() => this.renderAlbumsList());
        this.galleryCollection.fetchPhotosList(this._initAlbumId).then(() => this.renderPhotosList());
    }

    initView($el){
        this.galleryView = new GalleryView($el, {
            onRenderPhotos: this.renderPhotos.bind(this),
        });
        this.galleryView.initView(this._initAlbumId);
    }

    renderAlbumsList(){
        this.galleryView.renderAlbumsList(this.galleryCollection.albumsList);
    }

    renderPhotosList(){
        this.galleryView.renderPhotosList(this.galleryCollection.imagesList);
    }

    renderPhotos(id){
        this.galleryCollection.fetchPhotosList(id).then(() => this.renderPhotosList());
    }
}