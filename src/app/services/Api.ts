export default {
    /* User */
    getUserByJwt: '/get-user-by-jwt',
    casLogin: '/cas/login/',
    casAuthenticate: '/cas/authenticate',

    /* Public */
    cgu: '/cgu',
    login: '/login',
    register: '/register',
    reset: '/reset/',

    /* Home */
    getLatestGalleries: '/get-latest-galleries',
    contact: '/contact',

    /* Dashboard */
    getPrivatePhotoGalleries: '/get-private-photo-galleries',
    getPrivateVideoGalleries: '/get-private-video-galleries',
    createGallery: '/create-gallery',
    filesNotModerated: '/files/not-moderated',
    fileUpload: '/file-upload/',
    downloadArchive: '/download-archive',
    editCgu: '/edit-cgu',
    editMembers: '/edit-members',
    getUsefulLinks: '/useful-links',
    editUsefulLinks: '/edit-useful-links',
    getAdminTutorials: '/admin-tutorials',
    editAdminTutorials: '/edit-admin-tutorials',

    /* Members */
    members: '/members',

    /* Material */
    material: '/materiel',

    /* Galleries */
    galleries: '/galleries/',
    getImages: '/get-images/',
    getAllGalleries: '/get-all-galleries',
    getGalleriesOfYear: '/get-galleries-of-year/',
    getRandomImage: '/get-random-image/',
    makePrivate: '/galleries/makeprivate',
    makePublic: '/galleries/makepublic',
    getFullImage: '/get-full-image',

    /* Reactions */
    updateReaction: '/update-reaction',
    getRandomUserReactions: '/get-random-user-reactions',
    getAllUserReactions: '/get-all-user-reactions',

    /* Movies */
    getFilmography: '/get-filmography',
    getVideo: '/get-video/',
    getVideoData: '/get-video-data',
    getVideoCoverImage: '/get-video-cover-image/',
    getVideoCoverImageThumb: '/get-video-cover-image-thumb/',
};
