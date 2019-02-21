import { IPixel } from "./Pixel";

export abstract class Constants {
    static readonly VALID_NUMBER_OF_DIFFERENCES: number = 7;

    static readonly MINIMAL_TIME_DUO: number = 150;
    static readonly MAXIMAL_TIME_DUO: number = 300;
    static readonly MINIMAL_TIME_SOLO: number = 210;
    static readonly MAXIMAL_TIME_SOLO: number = 360;
    static readonly NUMBER_HIGH_SCORE: number = 3;
    static readonly SECOND_PER_MINUTE: number = 60;
    static readonly MAXIMAL_USER_ID: number = 999;
    static readonly TWO_DIGIT: number = -2;

    static readonly PUBLIC_OG_FOLDER_PATH: string = "/public/originalImages/";
    static readonly PUBLIC_MODIF_FOLDER_PATH: string = "/public/modifiedImages/";
    static readonly PUBLIC_DIFF_FOLDER_PATH: string = "/public/differenceImages/";
    static readonly PUBLIC_TEMP_FOLDER_PATH: string = "/public/tempDifferenceImage/";

    static readonly ORIGINAL_IMAGE_FOLDER: string = "http://localhost:3000/originalImages/";
    static readonly MODIFIED_IMAGE_FOLDER: string = "http://localhost:3000/modifiedImages/";
    static readonly DIFFERENCE_IMAGE_FOLDER: string = "http://localhost:3000/differenceImages/";

    static readonly MINIMUM_NAME_LENGTH: number = 3;
    static readonly MAXIMUM_NAME_LENGTH: number = 15;
    static readonly MINIMUM_USERNAME_LENGTH: number = 3;
    static readonly MAXIMUM_USERNAME_LENGTH: number = 20;

    static readonly ACCEPTED_HEIGHT: number = 480;
    static readonly ACCEPTED_WIDTH: number = 640;
    static readonly ACCEPTED_BIT_DEPTH: number = 24;

    static readonly LEFT_SIDE: number = 0;
    static readonly RIGHT_SIDE: number = 639;

    static readonly WHITE_PIXEL_PARAMETER: number = 255;
    static readonly BLACK_PIXEL_PARAMETER: number = 0;
    static readonly PIXEL_PARAMETERS_NB: number = 3;

    static readonly MAX_PIXEL_REACH: number = 4;
    static readonly EXTENSION_LENGTH: number = 4;
    static readonly ENLARGING_SURFACE_RADIUS: number = 3;

    static readonly COLOR: number = 0;
    static readonly IS_VISITED: number = 1;
    static readonly TOP_LEFT: number = Constants.ACCEPTED_WIDTH - 1;
    static readonly TOP: number = Constants.ACCEPTED_WIDTH;
    static readonly TOP_RIGHT: number = Constants.ACCEPTED_WIDTH + 1;
    static readonly LEFT: number = -1;
    static readonly RIGHT: number = 1;
    static readonly BOTTOM_LEFT: number = -Constants.ACCEPTED_WIDTH - 1;
    static readonly BOTTOM: number = -Constants.ACCEPTED_WIDTH;
    static readonly BOTTOM_RIGHT: number = -Constants.ACCEPTED_WIDTH + 1;

    static readonly BLACK_PIXEL: IPixel = { red: 0, blue: 0, green: 0 };

    static readonly FOUR_BYTES: number = 4;
    static readonly TWO_BYTES: number = 2;
    static readonly BYTES_PER_PIXEL: number = 3;
    static readonly DUMMY_VALUE: number = 0;
    static readonly OFFSET_SIZE: number = 54;
    static readonly HEADER_SIZE: number = 40;
    static readonly FLAG: string = "BM";
    static readonly PLANES: number = 1;
    static readonly EXTRA_BYTES: number = Constants.ACCEPTED_WIDTH % Constants.FOUR_BYTES;
    static readonly LINE_BYTE_SIZE: number = (Constants.ACCEPTED_WIDTH * Constants.BYTES_PER_PIXEL)
        + Constants.EXTRA_BYTES;
    static readonly RGB_SIZE: number = Constants.ACCEPTED_HEIGHT * Constants.LINE_BYTE_SIZE;
    static readonly FILE_SIZE: number = Constants.RGB_SIZE + Constants.OFFSET_SIZE;

    static readonly ERROR: number = 400;

    static readonly DB_URL: string = "mongodb://admin:admin102@ds163254.mlab.com:63254/log2990-h19-equipe102";

    static readonly X_OBJECT_DISPERSION: number = 200;
    static readonly Y_OBJECT_DISPERSION: number = 100;
    static readonly Z_OBJECT_DISPERSION: number = 50;
    static readonly CIRCLE_DEGREES_NB: number = 360;

    static readonly MIN_OBJECTS_NB: number = 10;
    static readonly MAX_OBJECTS_NB: number = 200;

    static readonly COLOR_PARAMETER_MAX_VALUE: number = 255;
    static readonly OBJECT_TYPES_NB: number = 5;
    static readonly REFERENCE_SIZE: number = 10;
    static readonly HALF_VALUE: number = 0.5;

    static readonly MODIFICATION_NB: number = 7;
    static readonly MODIFICATION_TYPE_NB: number = 3;

    static readonly SQUARE_FACTOR: number = 2;
    static readonly DIMENSIONS_NB: number = 3;

    /* SERVER */

    static readonly SERVER_BASE_URL: string = "http://localhost:3000/";
    static readonly API_NEWGAME_URL: string = "api/differences/new_game";
    static readonly API_DIFFVALIDATOR_URL: string = "api/differences/difference_validator";

    static readonly DIFFIMAGE_SUFFIX = "Differences.bmp";

    /*Game View*/
    static readonly NUMBER_MEDAL: number = 3;
    static readonly GOLD_COLOR: string = "#FFD700";
    static readonly SILVER_COLOR: string = "#C0C0C0";
    static readonly BRONZE_COLOR: string = "#CD7F32";
    static readonly MEDAL_COLOR_SCALE: string[] = [Constants.GOLD_COLOR, Constants.SILVER_COLOR,
    Constants.BRONZE_COLOR, "white"];

    static readonly SECOND_TO_MILLISECOND: number = 1000;
    static readonly MINUTE_TO_SECOND: number = 60;
    static readonly DIGIT_OVERFLOW: number = 10;
    static readonly PERCENT_FACTOR: number = 100;

    // for the image displayer
    static readonly CTX_2D: string = "2d";
    static readonly RED_COLOR: number = 0;
    static readonly GREEN_COLOR: number = 1;
    static readonly BLUE_COLOR: number = 2;
    static readonly NEXT_PIXEL_RGB: number = 3;
    static readonly NEXT_PIXEL_RGBA: number = 4;
    static readonly OPACITY_INDEX: number = 3;
    static readonly MAX_PIXEL_OPACITY: number = 255;

    // for the 2D form validator
    static readonly MIN_TITLE_LENGTH: number = 3;
    static readonly MAX_TITLE_LENGTH: number = 15;
    static readonly VALID_BMP_HEIGHT: number = 480;
    static readonly VALID_BMP_WIDTH: number = 640;
    static readonly VALID_FILE_EXTENSION: string = "bmp";
    static readonly VALID_BITS_PER_PIXEL: number = 24;

    // for the bitmap reader
    static readonly WIDTH_OFFSET: number = 18;
    static readonly HEIGHT_OFFSET: number = 22;
    static readonly BITS_PER_PIXEL_OFFSET: number = 28;
    static readonly PIXEL_OFFSET: number = 10;

    static readonly LIST_2D: number = 0;
    static readonly LIST_3D: number = 1;

    static readonly USERNAME: number = 0;
    static readonly TIME: number = 1;

    // for the 3D form
    static readonly MAX_NUMBER_OF_OBJECTS: number = 200;
    static readonly MIN_NUMBER_OF_OBJECTS: number = 10;
    static readonly MIN_NUMBER_OF_CHECKED_CHECKBOXES: number = 1;
    static readonly OBJECT_TYPES: string[] = [
        "Formes géométriques",
        "Forêt",
        "Océan"
    ];

    // for the sounds played when a difference is found
    static readonly SOUND_FOLDER: string = "../../../assets/Sounds/";
    static readonly VICTORY_SOUND: string = "victorySound.mp3";
    static readonly FAIL_SOUND: string = "failSound.mp3";


    static readonly CAMERA_FIELD_OF_VIEW: number = 80;
    static readonly CAMERA_RENDER_DISTANCE: number = 500;
    static readonly Z_CAMERA_POSITION: number = 90;

    static readonly RADIAL_PRECISION: number = 15;

    static readonly SPHERE: number = 0;
    static readonly CUBE: number = 1;
    static readonly CYLINDER: number = 2;
    static readonly CONE: number = 3;
    static readonly PYRAMID: number = 4;
    static readonly PYRAMID_BASE_SIDES_NB: number = 3;

    static readonly AMBIENT_LIGHT_INTENSITY: number = 1;
    static readonly DIRECTIONAL_LIGHT_INTENSITY: number = 5;
    static readonly AMBIENT_LIGHT_COLOR: number = 0xffffff;
    static readonly DIRECTIONAL_LIGHT_COLOR: number = 0x333333;

    static readonly DIFFERENCE_NB: number = 7;
}

export enum Dimension {
    TWO_DIMENSION,
    THREE_DIMENSION,
}

export enum Mode {
    SOLO,
    ONE_VS_ONE,
}