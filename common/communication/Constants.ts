export class ServerConstants {
    static VALID_NUMBER_OF_DIFFERENCES: number = 7;

    static MINIMAL_TIME_DUO: number = 150;
    static MAXIMAL_TIME_DUO: number = 300;
    static MINIMAL_TIME_SOLO: number = 210;
    static MAXIMAL_TIME_SOLO: number = 360;
    static NUMBER_HIGH_SCORE: number = 3;
    static SECOND_PER_MINUTE: number = 60;
    static MAXIMAL_USER_ID: number = 999;
    static TWO_DIGIT: number = -2;

    static ORIGINAL_IMAGE_FOLDER: string = "http://localhost:3000/originalImages/";
    static MODIFIED_IMAGE_FOLDER: string = "http://localhost:3000/modifiedImages/";
    static DIFFERENCE_IMAGE_FOLDER: string = "http://localhost:3000/differenceImages/";

    static MINIMUM_NAME_LENGTH: number = 3;
    static MAXIMUM_NAME_LENGTH: number = 15;
    static MINIMUM_USERNAME_LENGTH: number = 3;
    static MAXIMUM_USERNAME_LENGTH: number = 20;

    static ACCEPTED_HEIGHT: number = 480;
    static ACCEPTED_WIDTH: number = 640;
    static ACCEPTED_BIT_DEPTH: number = 24;

    static WHITE_PIXEL_PARAMETER: number = 255;
    static BLACK_PIXEL_PARAMETER: number = 0;
    static PIXEL_PARAMETERS_NB: number = 3;

    static MAX_PIXEL_REACH: number = 4;
    static EXTENSION_LENGTH: number = 4;
    static ENLARGING_SURFACE_RADIUS: number = 3;

    static COLOR: number = 0;
    static IS_VISITED: number = 1;
    static TOP_LEFT: number = ServerConstants.ACCEPTED_WIDTH - 1;
    static TOP: number = ServerConstants.ACCEPTED_WIDTH ;
    static TOP_RIGHT: number = ServerConstants.ACCEPTED_WIDTH + 1;
    static LEFT: number = -1;
    static RIGHT: number = 1;
    static BOTTOM_LEFT: number = -ServerConstants.ACCEPTED_WIDTH - 1;
    static BOTTOM: number = -ServerConstants.ACCEPTED_WIDTH ;
    static BOTTOM_RIGHT: number = -ServerConstants.ACCEPTED_WIDTH + 1;

    static FOUR_BYTES: number = 4;
    static TWO_BYTES: number = 2;
    static BYTES_PER_PIXEL: number = 3;
    static DUMMY_VALUE: number = 0;
    static OFFSET_SIZE: number = 54;
    static HEADER_SIZE: number = 40;
    static FLAG: string = "BM";
    static PLANES: number = 1;
    static EXTRA_BYTES: number = ServerConstants.ACCEPTED_WIDTH % ServerConstants.FOUR_BYTES;
    static LINE_BYTE_SIZE: number = (ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL) + ServerConstants.EXTRA_BYTES;
    static RGB_SIZE: number = ServerConstants.ACCEPTED_HEIGHT * ServerConstants.LINE_BYTE_SIZE;
    static FILE_SIZE: number = ServerConstants.RGB_SIZE + ServerConstants.OFFSET_SIZE;

    static ERROR: number = 400;

    static DB_URL: string = "mongodb://admin:admin102@ds163254.mlab.com:63254/log2990-h19-equipe102";
}

export class ClientConstants {
    static SERVER_BASE_URL: string = "http://localhost:3000/";

    // For the 2D form validator
    static MIN_TITLE_LENGTH: number = 3;
    static MAX_TITLE_LENGTH: number = 15;
    static VALID_BMP_HEIGHT: number = 480;
    static VALID_BMP_WIDTH: number = 640;
    static VALID_BITS_PER_PIXEL: number = 24;

    // For the bitmap reader
    static WIDTH_OFFSET: number = 18;
    static HEIGHT_OFFSET: number = 22;
    static BITS_PER_PIXEL_OFFSET: number = 28;
    static PIXEL_OFFSET: number = 10;

    static LIST_2D: number = 0;
    static LIST_3D: number = 1;
    
    //For the 3D form 
    static MAX_NUMBER_OF_OBJECTS: number = 200;
    static MIN_NUMBER_OF_OBJECTS: number = 10;
    static MIN_NUMBER_OF_CHECKED_CHECKBOXES: number = 1;
    static OBJECT_TYPES: string[] = [
        "Formes géométriques",
        "Forêt",
        "Océan"
    ];

    static CAMERA_FIELD_OF_VIEW: number = 80;
    static CAMERA_RENDER_DISTANCE: number = 500;
    static Z_CAMERA_POSITION: number = 90;

    static MIN_OBJECTS_NB: number = 10;
    static MAX_OBJECTS_NB: number = 200;

    static COLOR_PARAMETER_MAX_VALUE: number = 255;
    static RADIAL_PRECISION: number = 20;
    static REFERENCE_SIZE: number = 10;
    static HALF_VALUE: number = 0.5;

    static OBJECT_TYPES_NB: number = 5;
    static SPHERE: number = 0;
    static CUBE: number = 1;
    static CYLINDER: number = 2;
    static CONE: number = 3;
    static PYRAMID: number = 4;
    static PYRAMID_BASE_SIDES_NB: number = 3;

    static X_OBJECT_DISPERSION: number = 220;
    static Y_OBJECT_DISPERSION: number = 110;
    static Z_OBJECT_DISPERSION: number = 55;
    static CIRCLE_DEGREES_NB: number = 360;

    static AMBIENT_LIGHT_INTENSITY: number = 1;
    static DIRECTIONAL_LIGHT_INTENSITY: number = 5;
    static AMBIENT_LIGHT_COLOR: number = 0xffffff;
    static DIRECTIONAL_LIGHT_COLOR: number = 0x333333;

    static FORWARD_KEY: number = 32;
    static BACKWARD_KEY: number = 8;
    static UP_KEY: number = 87;
    static DOWN_KEY: number = 83;
    static LEFT_KEY: number = 65;
    static RIGHT_KEY: number = 68;
    static SAVE_KEY: number = 13;
    static MOVING_FACTOR: number = 2;
}
