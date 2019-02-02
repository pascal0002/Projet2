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

    static MINIMUM_NAME_LENGTH: number = 3;
    static MAXIMUM_NAME_LENGTH: number = 15;

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

    static ERROR: number = 400;
}

export class ClientConstants {
    static SERVER_BASE_URL: string = "http://localhost:3000/";

    static MIN_TITLE_LENGTH: number = 3;
    static MAX_TITLE_LENGTH: number = 15;
    static VALID_BMP_HEIGHT: number = 480;
    static VALID_BMP_WIDTH: number = 640;
    static VALID_BITS_PER_PIXEL: number = 24;

    static WIDTH_OFFSET: number = 18;
    static HEIGHT_OFFSET: number = 22;
    static BITS_PER_PIXEL_OFFSET: number = 28;
    static PIXEL_OFFSET: number = 10;
}