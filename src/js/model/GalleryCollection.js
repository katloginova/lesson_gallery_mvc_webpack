'use strict';

export default class GalleryCollection {
    constructor(urlAlbums, urlPhotos) {
        this._urlAlbums = urlAlbums;
        this._urlPhotos = urlPhotos;

        this.albumsList = [];
        this.imagesList = [];
    }

    fetchAlbumsList() {
        return fetch(this._urlAlbums)
            .then(res => res.json())
            .then((data) => this.setDataAlbums(data));
    }
    
    setDataAlbums(data){
        this.albumsList = data;
    }

    fetchPhotosList(id) {
        return fetch(`${this._urlPhotos}${id}`)
            .then(res => res.json())
            .then((data) => this.setDataPhotos(data));
    }

    setDataPhotos(data){
        this.imagesList = data;
    }
}