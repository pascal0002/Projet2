export abstract class ServerConstants {
    static readonly VALID_NUMBER_OF_DIFFERENCES: number = 7;

    static readonly MINIMAL_TIME_DUO: number = 150;
    static readonly MAXIMAL_TIME_DUO: number = 300;
    static readonly MINIMAL_TIME_SOLO: number = 210;
    static readonly MAXIMAL_TIME_SOLO: number = 360;
    static readonly NUMBER_HIGH_SCORE: number = 3;
    static readonly SECOND_PER_MINUTE: number = 60;
    static readonly MAXIMAL_USER_ID: number = 999;
    static readonly TWO_DIGIT: number = -2;

    static readonly ORIGINAL_IMAGE_FOLDER: string = "http://localhost:3000/originalImages/";
    static readonly MODIFIED_IMAGE_FOLDER: string = "http://localhost:3000/modifiedImages/";

    static readonly MINIMUM_NAME_LENGTH: number = 3;
    static readonly MAXIMUM_NAME_LENGTH: number = 15;
    static readonly MINIMUM_USERNAME_LENGTH: number = 3;
    static readonly MAXIMUM_USERNAME_LENGTH: number = 20;

    static readonly ACCEPTED_HEIGHT: number = 480;
    static readonly ACCEPTED_WIDTH: number = 640;
    static readonly ACCEPTED_BIT_DEPTH: number = 24;

    static readonly WHITE_PIXEL_PARAMETER: number = 255;
    static readonly BLACK_PIXEL_PARAMETER: number = 0;
    static readonly PIXEL_PARAMETERS_NB: number = 3;

    static readonly MAX_PIXEL_REACH: number = 4;
    static readonly EXTENSION_LENGTH: number = 4;
    static readonly ENLARGING_SURFACE_RADIUS: number = 3;

    static readonly COLOR: number = 0;
    static readonly IS_VISITED: number = 1;
    static readonly TOP_LEFT: number = ServerConstants.ACCEPTED_WIDTH - 1;
    static readonly TOP: number = ServerConstants.ACCEPTED_WIDTH;
    static readonly TOP_RIGHT: number = ServerConstants.ACCEPTED_WIDTH + 1;
    static readonly LEFT: number = -1;
    static readonly RIGHT: number = 1;
    static readonly BOTTOM_LEFT: number = -ServerConstants.ACCEPTED_WIDTH - 1;
    static readonly BOTTOM: number = -ServerConstants.ACCEPTED_WIDTH;
    static readonly BOTTOM_RIGHT: number = -ServerConstants.ACCEPTED_WIDTH + 1;

    static readonly FOUR_BYTES: number = 4;
    static readonly TWO_BYTES: number = 2;
    static readonly BYTES_PER_PIXEL: number = 3;
    static readonly DUMMY_VALUE: number = 0;
    static readonly OFFSET_SIZE: number = 54;
    static readonly HEADER_SIZE: number = 40;
    static readonly FLAG: string = "BM";
    static readonly PLANES: number = 1;
    static readonly EXTRA_BYTES: number = ServerConstants.ACCEPTED_WIDTH % ServerConstants.FOUR_BYTES;
    static readonly LINE_BYTE_SIZE: number = (ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL) + ServerConstants.EXTRA_BYTES;
    static readonly RGB_SIZE: number = ServerConstants.ACCEPTED_HEIGHT * ServerConstants.LINE_BYTE_SIZE;
    static readonly FILE_SIZE: number = ServerConstants.RGB_SIZE + ServerConstants.OFFSET_SIZE;

    static readonly ERROR: number = 400;
}

export abstract class ClientConstants {
    static readonly SERVER_BASE_URL: string = "http://localhost:3000/";

    static readonly MIN_TITLE_LENGTH: number = 3;
    static readonly MAX_TITLE_LENGTH: number = 15;
    static readonly VALID_BMP_HEIGHT: number = 480;
    static readonly VALID_BMP_WIDTH: number = 640;
    static readonly VALID_BITS_PER_PIXEL: number = 24;

    static readonly WIDTH_OFFSET: number = 18;
    static readonly HEIGHT_OFFSET: number = 22;
    static readonly BITS_PER_PIXEL_OFFSET: number = 28;
    static readonly PIXEL_OFFSET: number = 10;

    /*Game View*/
    static readonly GOLD_COLOR: string = "#FFD700";
    static readonly SILVER_COLOR: string = "#C0C0C0";
    static readonly BRONZE_COLOR: string = "#CD7F32";
    static readonly MEDAL_COLOR_SCALE: string[] = [ClientConstants.GOLD_COLOR, ClientConstants.SILVER_COLOR, ClientConstants.BRONZE_COLOR, "white"];

    static readonly SECOND_TO_MILLISECOND: number = 1000;
    static readonly PERCENT_FACTOR: number = 100;
}