# ClassroomManager
### Web application to help teachers manage students, projects, and assignments

Connects to API in [this repository](https://github.com/Ailuridaes/ClassroomManagerAPI).

### Technologies Used:
- HTML
- CSS
    + Bulma
- Javascript
    + AngularJS
    + angular-toastr
- Gulp

After cloning run `bower install`, `npm install` and then `gulp serve` to run on localhost. Defaults to port 8080, which is configurable in the gulpfile in the 'connect' task.

To pull data, urls in /src/app/core/values.js must point to ClassroomManagerAPI.
