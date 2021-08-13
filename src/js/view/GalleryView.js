'use strict';

import '../../scss/style.scss';
import albumTemplate from './albumTemplate.html';
import photoTemplate from './photoTemplate.html';


const ALBUMS_ITEM_SELECTOR = '.albums__item';
const ALBUMS_SELECTOR = '.albums';
const ACTIVE_CLASS = 'active';

export default class GalleryView {
    constructor($el, config = {}) {
        this._container = $el;
        this._config = config;

        this._$albumsList = null;
        this._$photosList = null;
    }

    initView(id) {
        this.initViewAlbums();
        this.initViewPhotos(id);
    }

    initViewAlbums() {
        this._$albumsList = $(`<ul class="albums"></ul>`);

        this._$albumsList.on('click', ALBUMS_ITEM_SELECTOR, this.onAlbumsListClick.bind(this));

        this._container.append(this._$albumsList);
    }

    initViewPhotos(id) {
        this.createElemAlbum(id);
    }

    onAlbumsListClick(e) {
        const id = this.getElementId($(e.target));

        this._config.onRenderPhotos(id);

        this._$photosList.remove();
        this.createElemAlbum(id);

        this.removeClassActive();
        this.addClassActive($(e.target));
    }

    createElemAlbum(id) {
        this._$photosList = $(`<div class="photos" data-photos-id="${id}"></div>`);

        this._container.append(this._$photosList);
    }

    getElementId($el) {
        return $el.data('albumId');
    }

    removeClassActive() {
        $.map($(ALBUMS_SELECTOR).children(), (item) => $(item).removeClass(ACTIVE_CLASS));
    }

    addClassActive($el) {
        $el.addClass(ACTIVE_CLASS);
    }

    renderAlbumsList(list) {
        this._$albumsList.html(list.map(this.getAlbumsItemHtml).join(''));
    }

    getAlbumsItemHtml({id, title}) {
        return albumTemplate
            .replace('{{id}}', id)
            .replace('{{title}}', title);
    }

    renderPhotosList(list) {
        this._$photosList.html(list.map(this.getPhotosItemHtml).join(''));
    }

    getPhotosItemHtml({id, thumbnailUrl, title}) {
        return photoTemplate
            .replace('{{id}}', id)
            .replace('{{thumbnailUrl}}', thumbnailUrl)
            .replace('{{title}}', title);
    }
}