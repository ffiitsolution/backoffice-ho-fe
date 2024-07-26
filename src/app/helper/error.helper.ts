import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MESSAGES } from './message.helper'

@Injectable({
  providedIn: 'root',
})
export class ErrorHelper {
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snackBar: MatSnackBar) {}

    public handleError(error: HttpErrorResponse): void {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            switch (error.status) {
              case 0:
                  errorMessage = MESSAGES.ERROR_MESSAGE_NO_CONNECTION_EN;
              break;
              case 500:
                  errorMessage = MESSAGES.ERROR_MESSAGE_CONNECTION_EN;
              break;
                case 400:
                    errorMessage = MESSAGES.ERROR_MESSAGE_INSERT;
                break;
                default:
                    errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
            }
        }

        this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-snackbar']
        });
    }
}
