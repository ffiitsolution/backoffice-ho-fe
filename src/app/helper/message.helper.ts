export enum MESSAGES {
    /////////////* / ID / */////////////

    /*/ SUCCESS MESSAGE */
    SUCCESS_MESSAGE_HEADER = 'Data berhasil disimpan!',
    SUCCESS_MESSAGE_RECIPE = 'Recipe code berhasil dipilih!',
    SUCCESS_MESSAGE_DOWNLOAD_FILE = 'File sudah terunduh.',
    SUCCESS_MESSAGE_UPDATE = 'Data berhasil diupdate!',

    /*/ ERROR MESSAGE */
    ERROR_SHOW_MESSAGE = 'Terjadi kesalahan dalam pengambilan Data!',
    ERROR_SHOW_MESSAGE_CONNECTION = 'Terjadi Kesalahan Koneksi, Mohon Coba Kembali Nanti',
    ERROR_MESSAGE_HEADER = 'Terjadi kesalahan dalam penyimpanan Data!',
    ERROR_MESSAGE_RECIPE = 'Receipe code inactive tidak bisa dipilih!',
    ERROR_MESSAGE_LOGIN = 'Sesi login Anda telah berakhir. Silahkan login ulang!',
    ERROR_MESSAGE_NOT_MATCH_LOGIN = 'User and Password not match.',
    ERROR_MESSAGE_TIMEOUT = 'Sesi login Anda telah berakhir. Silahkan login ulang!',
    ERROR_MESSAGE_DOWNLOAD_FILE = 'File tidak dapat terunduh',

    /*/ CONFIRMATION MESSAGE */
    INACTIVE_CONFRIMATION_MESSAGE = 'Apakah Anda yakin akan melakukan perubahan inactive pada item ini?',
    ACTIVATE_CONFRIMATION_MESSAGE = 'Apakah Anda yakin akan melakukan perubahan aktifasi pada item ini?',

    /////////////* / EN / */////////////
    /*/ SUCCESS MESSAGE */
    SUCCESS_MESSAGE_CREATED_EN = 'Data Created Successfully!',
    SUCCESS_MESSAGE_RECIPE_EN = 'Recipe Code Selected Successfully!',
    SUCCESS_MESSAGE_DOWNLOAD_FILE_EN = 'The File has been Downloaded.',
    SUCCESS_MESSAGE_UPDATE_EN = 'Data Updated Successfully!',

    /*/ ERROR MESSAGE */
    ERROR_MESSAGE_NO_CONNECTION_EN = 'No connection to server.',
    ERROR_MESSAGE_CONNECTION_EN = 'Internal Server Error. Please Try Again Later.',
    ERROR_MESSAGE_INSERT = 'The Value Entered is Incorrect or Already Exists, Please Try Again',

    /*/ CONFIRMATION MESSAGE */
    INACTIVE_CONFRIMATION_MESSAGE_EN = 'Are you sure you want to make inactive changes to this item?',
    ACTIVATE_CONFRIMATION_MESSAGE_EN = 'Are you sure you want to make activation changes to this item?',
}
