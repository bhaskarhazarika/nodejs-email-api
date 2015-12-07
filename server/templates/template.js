var swig  = require('swig');
var template = swig.compileFile('./template.html');
var data=require('./data.json');

var output = template({
    templatename: 'Order Details',
    data: data
});

console.log(output);