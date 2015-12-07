var swig  = require('swig');
var path=require('path');

var templatepath=path.join(process.cwd(),"templates");

module.exports = function(Message) {
Message.observe('after save', function(ctx, next) {
  if (ctx.instance) {
  	var template = swig.compileFile(path.join(templatepath,ctx.instance.template+'.html'));
	var output = template({
	    templatename: 'Order Details',
	    //data: {"order_num":"123","order":[]}
	    data: ctx.instance.data
		});
    //console.log('output',output,ctx.instance,typeof(ctx.instance));
    console.log(output);

	Message.app.models.Email.send({
	      to: "bhaskarjyoti86@gmail.com",
	      from: "node2test@gmail.com",
	      subject: 'Password reset',
	      html: output
	    }, function(err) {
	      if (err) return console.log('> error sending password reset email',err);
	      console.log('> sending password reset email to:');
	    });
  } else {
    console.log('Updated %s matching %j',
      ctx.Model.pluralModelName,
      ctx.where);
  }
  next();
});
};






