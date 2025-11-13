class ApiResponse {
     constructor(statusCode,
          data = null,
          message = "Success",
     ) {
          this.statusCode = statusCode;
          this.data = data;
          this.message = statusCode < 400 ? message : "Something went wrong";
     }
}

export {ApiResponse}